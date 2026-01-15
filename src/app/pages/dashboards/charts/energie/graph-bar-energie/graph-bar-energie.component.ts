import { Component, ChangeDetectorRef } from '@angular/core';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import { FaitSuiviEnergieService } from 'src/app/core/services/fait-suivi-energie.service';
import { SuiviEnergieDetailsService } from 'src/app/core/services/suivi-energie-details.service';

@Component({
  selector: 'app-graph-bar-energie',
  templateUrl: './graph-bar-energie.component.html',
  styleUrls: ['./graph-bar-energie.component.scss']
})
export class GraphBarEnergieComponent {
  
 constructor(
    private energySvc: FaitSuiviEnergieService,
    private detailSvc: SuiviEnergieDetailsService,
    private cd: ChangeDetectorRef
  ) {}

  breadCrumbItems = [{ label: 'Charts' }, { label: 'E - Chart', active: true }];

  chartOpts: any;                       // option echarts
  detailConsoList: [string, string, number][] = [];
  monthlyDetails: Record<string, any[]> = {};

  currentPage = 1;
  itemsPerPage = 5;

  shortMonths: string[] = [];
  kwhData: number[] = [];

  selectedMonth = '';
  selectedShort = '';

  private monthMap: Record<string, string> = {
    Jan: 'Janvier', Fev: 'Février', Mars: 'Mars', Avr: 'Avril',
    Mai: 'Mai', Juin: 'Juin', Juil: 'Juillet', Aout: 'Août',
    Sep: 'Septembre', Oct: 'Octobre', Nov: 'Novembre', Dec: 'Décembre'
  };

  ngOnInit(): void {
  console.log('[BarEnergie] init');
  this.loadYear('20230101', '20231231');
}

// dans graph-bar-energie.component.ts
totalMonth(month: string): number {
  return this.monthlyDetails[month]?.reduce((s, d) => s + d[2], 0) ?? 0;
}

private loadYear(start: string, end: string): void {
  this.energySvc.getQuantiteKwhConsMois(start, end).subscribe({
    next: raw => {
      console.log('[BarEnergie] raw data ->', raw);
      this.prepareAxis(raw);
      this.selectFirstMonth();
      this.buildChart();
    },
    error: err => console.error('[BarEnergie] erreur api annuelle', err)
  });
}

private prepareAxis(raw: [string, string, number][]): void {
  const mapper: Record<string, string> = {
    January: 'Jan', February: 'Fev', March: 'Mars', April: 'Avr',
    May: 'Mai', June: 'Juin', July: 'Juil', August: 'Aout',
    September: 'Sep', October: 'Oct', November: 'Nov', December: 'Dec'
  };

  // 1) agrégation par mois
  const agg = new Map<string, number>();
  raw.forEach(([monthYear, , kwh]) => {
    const [enMonth, yr] = monthYear.split(' ');
    const fr = mapper[enMonth];
    if (!fr) return;
    const key = `${fr} ${yr}`;
    agg.set(key, (agg.get(key) || 0) + (Number(kwh) || 0));
  });

  // 2) tri chronologique
  const sorter = Object.keys(mapper);
  const entries = [...agg.entries()].sort((a, b) => {
    const [ma, ya] = a[0].split(' ');
    const [mb, yb] = b[0].split(' ');
    const yDiff = +ya - +yb;
    return yDiff !== 0 ? yDiff : sorter.indexOf(ma) - sorter.indexOf(mb);
  });

  this.shortMonths = entries.map(([k]) => k);
  this.kwhData     = entries.map(([, v]) => v);

  console.log('shortMonths', this.shortMonths);
  console.log('kwhData', this.kwhData);
}



private selectFirstMonth(): void {
  if (!this.shortMonths.length) return;
  const [short, yr] = this.shortMonths[0].split(' ');
  this.selectedShort = short;
  this.selectedMonth = this.monthMap[short];
  this.loadMonthDetails(short, yr);
}

private loadMonthDetails(short: string, yr: string): void {
  const mIndex = Object.keys(this.monthMap).indexOf(short) + 1;
  const last   = new Date(+yr, mIndex, 0).getDate();
  const start  = `${yr}-${String(mIndex).padStart(2, '0')}-01`;
  const end    = `${yr}-${String(mIndex).padStart(2, '0')}-${last}`;

  if (this.monthlyDetails[this.selectedMonth]) {
    this.detailConsoList = this.monthlyDetails[this.selectedMonth];
    this.cd.detectChanges();
    return;
  }

  this.detailSvc.getDetailConsoMois(start, end).subscribe({
    next: d => {
      console.log(`[BarEnergie] détails ${this.selectedMonth} ->`, d);
      this.detailConsoList = d;
      this.monthlyDetails[this.selectedMonth] = d;
      this.cd.detectChanges();
    },
    error: e => console.error('[BarEnergie] erreur détails mois', e)
  });
}

private buildChart(): void {
  this.chartOpts = {
    grid: { left: '0%', right: '0%', bottom: '0%', top: '3%', containLabel: true },
    tooltip: {
      trigger: 'axis',
      formatter: p => `<strong>${p[0].axisValue}</strong> : ${p[0].data} kWh`
    },
    xAxis: { type: 'category', data: this.shortMonths },
    yAxis: { type: 'value' },
    series: [{
      data: this.kwhData,
      type: 'bar',
      showBackground: true,
      backgroundStyle: { color: 'rgba(180,180,180,.2)' },
      itemStyle: {
        color: p => this.shortMonths[p.dataIndex] === this.selectedShort ? '#2E7D32' : '#4CAF50'
      }
    }]
  };

  // 2) on force le refresh une fois que le DOM est stable
  setTimeout(() => {
    this.chartOpts = { ...this.chartOpts };   // nouvelle ref → ngx-echarts re-render
  }, 0);
}

onBarClick(params: any): void {
  if (!params?.name) return;
  const [short, yr] = params.name.split(' ');
  this.selectedShort = short;
  this.selectedMonth = this.monthMap[short];
  this.buildChart();                // recalcule couleurs
  this.loadMonthDetails(short, yr);
}

exportToPDF(): void {
  const doc = new jsPDF();
  const title = 'Évolution mensuelle consommation';
  const rows = this.shortMonths.map((m, i) => [m, this.kwhData[i]]);
  autoTable(doc, { head: [['Mois', 'kWh']], body: rows });
  doc.save('evolution.pdf');
  console.log('[BarEnergie] PDF global généré');
}

exportToExcel(): void {
  const rows = this.shortMonths.map((m, i) => ({ Mois: m, kWh: this.kwhData[i] }));
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Evolution');
  XLSX.writeFile(wb, 'evolution.xlsx');
  console.log('[BarEnergie] Excel global généré');
}

exportToPDFMonth(): void {
  if (!this.selectedMonth || !this.monthlyDetails[this.selectedMonth]) return;
  const doc = new jsPDF();
  const body = this.monthlyDetails[this.selectedMonth].map((d, i) => [i + 1, d[1], d[2]]);
  autoTable(doc, { head: [['#', 'Direction', 'kWh']], body });
  doc.save(`details_${this.selectedMonth}.pdf`);
  console.log('[BarEnergie] PDF mois généré');
}

exportToExcelMonth(): void {
  if (!this.selectedMonth || !this.monthlyDetails[this.selectedMonth]) return;
  const rows = this.monthlyDetails[this.selectedMonth].map((d, i) => ({ '#': i + 1, Direction: d[1], kWh: d[2] }));
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Détails');
  XLSX.writeFile(wb, `details_${this.selectedMonth}.xlsx`);
  console.log('[BarEnergie] Excel mois généré');
}

calcPercent(value: number, month: string): string {
  const total = this.monthlyDetails[month]?.reduce((s, d) => s + d[2], 0) ?? 0;
  return total ? ((value / total) * 100).toFixed(2) + '%' : '0%';
}

}
