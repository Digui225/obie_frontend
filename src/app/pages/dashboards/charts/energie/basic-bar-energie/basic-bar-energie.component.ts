import { Component } from '@angular/core';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

import { Monthly_details } from 'src/app/shared/datas';
import { FaitSuiviEnergieService } from 'src/app/core/services/fait-suivi-energie.service';
import { SuiviEnergieDetailsService } from 'src/app/core/services/suivi-energie-details.service';
import * as echarts from 'echarts';
 


@Component({
  selector: 'app-basic-bar-energie',
  templateUrl: './basic-bar-energie.component.html',
  styleUrls: ['./basic-bar-energie.component.scss']
})
export class BasicBarEnergieComponent {

  constructor(private faitSuiviEnergieService: FaitSuiviEnergieService,
    private suiviEnergieDetailService: SuiviEnergieDetailsService
  ){}

    //monthlyDetails = Monthly_details;



  // bread crumb items
  breadCrumbItems!: Array<{}>;
  BasicBarChart:any;
  detailConsoList: [string,string, number][] = [];
  chartInstance: any; // à ajouter pour l'événement clic sur la barre

   // ➡️ Pour gérer la pagination :
   currentPage: number = 1; 
   itemsPerPage: number = 5; 

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Charts' }, { label: 'E - Chart', active: true }];

    // Chart Color Data Get Function
    
    const start = '20230101';
    const end = '20231231';
  
    
    this.faitSuiviEnergieService.getQuantiteKwhConsMois(start, end).subscribe((data: any[]) => {
      console.log('Données brutes :', data);
  
      this.processBackendData(data); // génère this.shortMonths + this.QuantiteKwhMens
      this._BasicBarChart('["--vz-success"]');
  
      // 🎯 Sélection automatique du 1er mois du graphe
      if (this.shortMonths.length > 0) {
        const defaultShortMonth = this.shortMonths[0]; // Ex: "Jan 2020"
        const [short, year] = defaultShortMonth.split(' ');
        const fullMonth = this.monthMap[short];
  
        this.selectedMonthShort = short;
        this.selectedMonth = fullMonth;
  
        const monthIndex = Object.keys(this.monthMap).indexOf(short) + 1;
        const formattedMonth = ('0' + monthIndex).slice(-2);
        const monthStart = `${year}-${formattedMonth}-01`;
        const monthEnd = `${year}-${formattedMonth}-31`;
  
        this.suiviEnergieDetailService.getDetailConsoMois(monthStart, monthEnd).subscribe({
          next: (details) => {
            this.detailConsoList = details;
            this.monthlyDetails[this.selectedMonth] = details;
            console.log(`📄 Données du tableau pour ${this.selectedMonth} ${year}:`, details);

          },
          error: (err) => {
            console.error('Erreur lors du chargement des détails initiaux :', err);
          }
        });
      }
    });

      // Initialisation du graphique et gestion du clic sur barre
        setTimeout(() => {
          this.chartInstance = echarts.init(document.getElementById('basic-bar-chart')!);

          this.chartInstance.setOption(this.BasicBarChart);

          this.chartInstance.on('click', (params: any) => {
            const label = params.name; // "Jan 2020"
            const [shortMonth, year] = label.split(' ');
            const fullMonth = this.monthMap[shortMonth];

            if (fullMonth && year) {
              this.selectedMonthShort = shortMonth;
              this.selectedMonth = fullMonth;

              this.updateBarColors(); // met à jour les couleurs

              const monthIndex = Object.keys(this.monthMap).indexOf(shortMonth) + 1;
              const formattedMonth = ('0' + monthIndex).slice(-2);
              const start = `${year}-${formattedMonth}-01`;
              const end = `${year}-${formattedMonth}-31`;

              if (this.monthlyDetails[fullMonth]) {
                this.detailConsoList = this.monthlyDetails[fullMonth];
              } else {
                this.suiviEnergieDetailService.getDetailConsoMois(start, end).subscribe({
                  next: (details) => {
                    this.detailConsoList = details;
                    this.monthlyDetails[fullMonth] = details;
                  },
                  error: (err) => {
                    console.error('Erreur lors du chargement des détails :', err);
                  }
                });
              }

              // Re-appliquer les couleurs avec le mois sélectionné
              this._BasicBarChart('["--vz-success"]');
              this.chartInstance.setOption(this.BasicBarChart, true);
            }
          });
        }, 10);
    
  
  }

  onPageChange(page: number): void {
    // 👉 Si on clique sur la même page, ne rien faire
    if (this.currentPage === page) {
      return;
    }
  
    this.currentPage = page;
  
    // 👉 Scroller seulement si la page change
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Chart Colors Set
  private getChartColorsArray(colors: any): string[] {
    let parsedColors: string[];
  
    try {
      parsedColors = Array.isArray(colors) ? colors : JSON.parse(colors);
    } catch (e) {
      console.error('Erreur de parsing des couleurs :', e);
      // On enveloppe la couleur dans un tableau pour que le .map() plus bas fonctionne
      parsedColors = [colors];
    }
  
    return parsedColors.map((value: any) => {
      const newValue = value.replace(" ", "");
      if (newValue.indexOf(",") === -1) {
        const color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
        return color ? color.trim() : newValue;
      } else {
        const val = value.split(',');
        if (val.length === 2) {
          const rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
          return `rgba(${rgbaColor},${val[1]})`;
        } else {
          return newValue;
        }
      }
    });
  }
  

    QuantiteKwhMens: number[] = [];

      shortMonths = ['Jan', 'Fev', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Aout', 'Sep', 'Oct', 'Nov', 'Dec'];
      months: string[] = [...this.shortMonths];

      selectedMonthShort: string = '';
      selectedMonth: string = '';

      monthMap: { [key: string]: string } = {
        Jan: 'Janvier', Fev: 'Février', Mars: 'Mars', Avr: 'Avril',
        Mai: 'Mai', Juin: 'Juin', Juil: 'Juillet', Aout: 'Août',
        Sep: 'Septembre', Oct: 'Octobre', Nov: 'Novembre', Dec: 'Décembre'
      };

      monthMapFullToShort: { [key: string]: string } = {
        Janvier: 'Jan', Février: 'Fev', Mars: 'Mars', Avril: 'Avr',
        Mai: 'Mai', Juin: 'Juin', Juillet: 'Juil', Août: 'Aout',
        Septembre: 'Sep', Octobre: 'Oct', Novembre: 'Nov', Décembre: 'Dec'
      };

          private processBackendData(data: any): void {
            const moisCourtFr: { [key: string]: string } = {
              January: 'Jan', February: 'Fev', March: 'Mars', April: 'Avr',
              May: 'Mai', June: 'Juin', July: 'Juil', August: 'Aout',
              September: 'Sep', October: 'Oct', November: 'Nov', December: 'Dec'
            };
          
            const labelsSet = new Set<string>();
            const quantiteMap = new Map<string, number>();
          
            console.log('📥 Données brutes :', data);
          
            data.forEach((entry: any) => {
              const [fullMonth, value] = entry;
              const [monthName, year] = fullMonth.split(' ');
              const shortMonth = moisCourtFr[monthName];
              if (!shortMonth || !year) return; // Sécurité
          
              const label = `${shortMonth} ${year}`;
              labelsSet.add(label);
              quantiteMap.set(label, value);
            });
          
            // On trie les labels (par année/mois)
            const moisOrdre = Object.keys(moisCourtFr); // ['January', 'February', ...]
            const labelsSorted = Array.from(labelsSet).sort((a, b) => {
              const [ma, ya] = a.split(' ');
              const [mb, yb] = b.split(' ');
              const na = parseInt(ya), nb = parseInt(yb);
              const ia = moisOrdre.indexOf(Object.keys(moisCourtFr).find(k => moisCourtFr[k] === ma)!);
              const ib = moisOrdre.indexOf(Object.keys(moisCourtFr).find(k => moisCourtFr[k] === mb)!);
              return na !== nb ? na - nb : ia - ib;
            });
          
            this.shortMonths = labelsSorted;
            this.QuantiteKwhMens = labelsSorted.map(label => quantiteMap.get(label) ?? 0);
          
            console.log('✅ Mois courts dynamiques :', this.shortMonths);
            console.log('✅ Quantité kWh :', this.QuantiteKwhMens);
          
            this._BasicBarChart('["#157b53", "#ffc107", "#28a745", "#dc3545", "#17a2b8", "#6f42c1"]');
          }
      

    

      getBarColors(): string[] {
        const baseColor = '#4CAF50';
        const selectedColor = '#2E7D32';
        return this.months.map(monthShort =>
          monthShort === this.selectedMonthShort ? selectedColor : baseColor
        );
      }

      private _BasicBarChart(colors: any): void {
        const defaultColors = this.getChartColorsArray(colors);
    
        this.BasicBarChart = {
          grid: { left: '0%', right: '0%', bottom: '0%', top: '3%', containLabel: true },
          tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: (params: any) => {
              const item = params[0];
              //const percentage = this.calculateMonthlyPercentage(item.data, item.axisValue);
              return `<strong>${item.axisValue}</strong> : ${item.data} kWh `;
            }
          },
          xAxis: {
            type: 'category',
            data: this.shortMonths,
            axisLine: { lineStyle: { color: '#858d98' } }
          },
          yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: '#858d98' } },
            splitLine: { lineStyle: { color: 'rgba(133, 141, 152, 0.1)' } }
          },
          textStyle: { fontFamily: 'Poppins, sans-serif' },
          series: [{
            data: this.QuantiteKwhMens,
            type: 'bar',
            showBackground: true,
            backgroundStyle: { color: 'rgba(180, 180, 180, 0.2)' },
            itemStyle: {
              color: (params: any) => {
                const month = this.shortMonths[params.dataIndex];
                return month === this.selectedMonthShort
                  ? '#2E7D32'
                  : defaultColors[params.dataIndex % defaultColors.length];
              }
            }
          }]
        };
      }
    

      updateBarColors(): void {
        const colors = this.getChartColorsArray('[\"--vz-success\"]');
        this._BasicBarChart(colors);
      }

      monthlyDetails: { [key: string]: any[] } = {}; // rempli après le clic sur une barre

      onBarClick(event: any): void {
        const label = event.name; // exemple : "Jan 2020"
        const [shortMonth, year] = label.split(' ');
        const fullMonth = this.monthMap[shortMonth];
    
        if (fullMonth && year) {
          this.selectedMonthShort = shortMonth;
          this.selectedMonth = fullMonth;
    
          this.updateBarColors();
          this.loadDetailsForMonth(shortMonth, year);
        }
      }
    
      private loadDetailsForMonth(shortMonth: string, year: string): void {
        const fullMonth = this.monthMap[shortMonth];
        const monthIndex = Object.keys(this.monthMap).indexOf(shortMonth) + 1;
        const formattedMonth = ('0' + monthIndex).slice(-2);
      
        // ✅ Obtenir le dernier jour du mois dynamiquement
        const lastDay = new Date(Number(year), monthIndex, 0).getDate(); // 🧠 clever trick
      
        const start = `${year}-${formattedMonth}-01`;
        const end = `${year}-${formattedMonth}-${lastDay}`; // plus de hardcoded 31
      
        this.suiviEnergieDetailService.getDetailConsoMois(start, end).subscribe({
          next: (details) => {
            this.detailConsoList = details;
            this.monthlyDetails[fullMonth] = details;
            console.log(`📄 Données du tableau pour ${fullMonth} ${year} (clic) :`, details);
          },
          error: (err) => {
            console.error('Erreur lors du chargement des détails:', err);
          }
        });
      }
      

      calculateMonthlyPercentage(value: number, month: string): number {
        const total = this.getTotalMonthlyConso(month);
        const pourcentage= (value / total) * 100;
        return parseFloat(pourcentage.toFixed(2));      }
      
      getTotalMonthlyConso(month: string): number {
        if (!this.monthlyDetails[month]) return 0;
      
        return this.monthlyDetails[month].reduce((sum, detail) => sum + detail[2], 0);
      }
      
      







   //Methode PDF
   exportToPDF(): void {
    const doc = new jsPDF();
    const title = 'ÉVOLUTION MENSUELLE DE LA CONSOMMATION';
    const fileName = 'evolution_mensuelle_consommation.pdf';
    const logoUrl = 'assets/images/gs2e_logo.jpg';
  
    const reader = new FileReader();
  
    fetch(logoUrl)
      .then(res => res.blob())
      .then(blob => {
        reader.readAsDataURL(blob);
        reader.onload = () => {
          const logoData = reader.result as string;
  
          // 🖼️ Logo
          doc.addImage(logoData, 'PNG', 10, 10, 30, 15);
  
          // 🏷️ Titre centré
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(16);
          const pageWidth = doc.internal.pageSize.getWidth();
          const titleWidth = doc.getTextWidth(title);
          const titleX = (pageWidth - titleWidth) / 2;
          doc.text(title, titleX, 40);
  
          // 📊 Données
          const labels = this.BasicBarChart.xAxis.data;
          const values = this.BasicBarChart.series[0].data;
          const totalConso = values.reduce((acc: number, val: number) => acc + val, 0);
          const headers = ['Mois', 'Consommation', 'Pourcentage'];
  
          const data = labels.map((mois: string, index: number) => {
            const val = values[index];
            const pourcentage = ((val / totalConso) * 100).toFixed(2);
            return [mois, val, `${pourcentage}%`];
          });
  
          (doc as any).autoTable({
            head: [headers],
            body: data,
            startY: 50,
            headStyles: {
              fillColor: [26, 189, 156],
              textColor: [255, 255, 255],
              fontStyle: 'bold'
            },
            styles: {
              font: 'helvetica',
              fontSize: 10,
              cellPadding: 3,
              halign: 'center'
            },
            alternateRowStyles: {
              fillColor: [240, 240, 240]
            }
          });
  
          // 🕒 Footer
          const now = new Date();
          const formattedDate = now.toLocaleString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          doc.text(`Généré le ${formattedDate}`, 10, doc.internal.pageSize.getHeight() - 10);
  
          doc.save(fileName);
          console.log("[✅] PDF exporté :", fileName);
        };
      })
      .catch(err => {
        console.error("❌ Erreur lors du chargement du logo :", err);
      });
  }
  


    // methode excel de telechargement 
    exportToExcel(): void {
            // Récupérer les labels (mois) et valeurs de consommation
            const labels = this.BasicBarChart.xAxis.data;
            const values = this.BasicBarChart.series[0].data;

            // Calculer le total pour le calcul du pourcentage
            const totalConso = values.reduce((acc: number, val: number) => acc + val, 0);

            // Construire les lignes avec pourcentage
            const rows = labels.map((mois: string, index: number) => {
                const val = values[index];
                const pourcentage = ((val / totalConso) * 100).toFixed(2);
                return [mois, val, `${pourcentage}%`];
            });

            // Créer la feuille Excel avec en-têtes
            const ws = XLSX.utils.aoa_to_sheet([
                ['Mois', 'Consommation', 'Pourcentage'],
                ...rows
            ]);

            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Évolution');

            // Télécharger le fichier
            XLSX.writeFile(wb, 'evolution_mensuelle_consommation.xlsx');
            }


            exportToPDFMonth(): void {
              if (!this.selectedMonth || !this.monthlyDetails[this.selectedMonth]) return;
            
              const doc = new jsPDF();
              const title = `DÉTAILS POUR LE MOIS : ${this.selectedMonth}`;
              const fileName = `details_${this.selectedMonth}.pdf`;
              const logoUrl = 'assets/images/gs2e_logo.jpg';
            
              const reader = new FileReader();
            
              fetch(logoUrl)
                .then(res => res.blob())
                .then(blob => {
                  reader.readAsDataURL(blob);
                  reader.onload = () => {
                    const logoData = reader.result as string;
            
                    // 🖼️ Logo
                    doc.addImage(logoData, 'PNG', 10, 10, 30, 15);
            
                    // 🏷️ Titre centré
                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(16);
                    const pageWidth = doc.internal.pageSize.getWidth();
                    const titleWidth = doc.getTextWidth(title);
                    const titleX = (pageWidth - titleWidth) / 2;
                    doc.text(title, titleX, 40);
            
                    // 📄 Données du tableau
                    const body = this.monthlyDetails[this.selectedMonth].map((detail, index) => [
                      index + 1,
                      detail[1],
                      detail[2],
                      this.calculateMonthlyPercentage(detail[1], this.selectedMonth) + '%'
                    ]);
            
                    (doc as any).autoTable({
                      startY: 50,
                      head: [['#', 'Direction', 'Consommation', 'Pourcentage']],
                      body: body,
                      foot: [[
                        '', 
                        'Total', 
                        this.getTotalMonthlyConso(this.selectedMonth), 
                        this.calculateMonthlyPercentage(this.getTotalMonthlyConso(this.selectedMonth), this.selectedMonth) + '%'
                      ]],
                      headStyles: {
                        fillColor: [26, 189, 156],
                        textColor: [255, 255, 255],
                        fontStyle: 'bold'
                      },
                      styles: {
                        font: 'helvetica',
                        fontSize: 10,
                        cellPadding: 3,
                        halign: 'center'
                      },
                      alternateRowStyles: {
                        fillColor: [245, 245, 245]
                      }
                    });
            
                    // 🕒 Footer
                    const now = new Date();
                    const formattedDate = now.toLocaleString('fr-FR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    });
                    doc.setFontSize(10);
                    doc.setFont('helvetica', 'normal');
                    doc.text(`Généré le ${formattedDate}`, 10, doc.internal.pageSize.getHeight() - 10);
            
                    doc.save(fileName);
                    console.log("[✅] PDF exporté :", fileName);
                  };
                })
                .catch(err => {
                  console.error("❌ Erreur lors du chargement du logo :", err);
                });
            }
            

exportToExcelMonth(): void {
  if (!this.selectedMonth || !this.monthlyDetails[this.selectedMonth]) return;

  const data = this.monthlyDetails[this.selectedMonth].map((detail, index) => ({
    '#': index + 1,
    'Direction': detail[1],
    'Consommation': detail[2],
    'Pourcentage': this.calculateMonthlyPercentage(detail[2], this.selectedMonth) + '%'
  }));

  // Ajout d'une ligne total à la fin
  data.push({
    '#': 0,
    'Direction': 'Total',
    'Consommation': this.getTotalMonthlyConso(this.selectedMonth),
    'Pourcentage': this.calculateMonthlyPercentage(this.getTotalMonthlyConso(this.selectedMonth), this.selectedMonth) + '%'
  });

  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  const workbook: XLSX.WorkBook = {
    Sheets: { 'Détails': worksheet },
    SheetNames: ['Détails']
  };

  XLSX.writeFile(workbook, `details_${this.selectedMonth}.xlsx`);
}

}
