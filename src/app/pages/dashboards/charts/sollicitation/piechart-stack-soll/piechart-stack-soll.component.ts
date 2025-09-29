import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { DataSharingService } from 'src/app/core/services/data-sharing.service';
import autoTable from 'jspdf-autotable';
import { ApiTableConfigService } from 'src/app/core/services/api-table-config.service';

@Component({
  selector: 'app-piechart-stack-soll',
  templateUrl: './piechart-stack-soll.component.html',
  styleUrls: ['./piechart-stack-soll.component.scss']
})
export class PiechartStackSollComponent {

  @Output() regionSelected = new EventEmitter<string>(); // Événement pour notifier la sélection d'une région
  @Input() showCard: boolean = false;  // Déclaration de l'entrée
  @Input() resultType: string = ''; // Type de résultats ('direction' ou 'typeAbonne')



  results: [string, number][] = [];
  showChart: boolean = false; // Cache le graphique au démarrage
  simplePieChart: any;
  selectedIndicateurs: string = '';
  selectedAxes: string = '';
  tableHeaders: string[] = [];
  tableConfig: any;
  errorMessage: string = ''; // 🔹 Ajout de l'attribut pour afficher une alerte d'erreur
  
  private destroy$ = new Subject<void>();




  constructor(
    private apiTableConfigService: ApiTableConfigService,
    private dataSharingService: DataSharingService) {}

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Charts' }, { label: 'E - Chart', active: true }];

    this.dataSharingService.selectedIndicateurs$
      .pipe(takeUntil(this.destroy$))
      .subscribe(indicateurs => {
        this.selectedIndicateurs = (indicateurs?.length > 0) 
          ? indicateurs.join(', ').toUpperCase() 
          : 'INDICATEUR';
      });

    this.dataSharingService.selectedAxes$
      .pipe(takeUntil(this.destroy$))
      .subscribe(axes => {
        this.selectedAxes = (axes?.length > 0) 
          ? axes.join(', ').toUpperCase() 
          : 'AXE';
      });

    this.dataSharingService.currentData
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        if (data?.length > 0) {
          this.results = data;
          this.errorMessage = '';
          this.updatePieChart();
          this.showChart = true;
        } else {
          this.showChart = false;
          this.errorMessage = 'Aucune donnée disponible pour cette sélection !';
        }
      });
  }

  get cardTitle(): string {
    return `${this.selectedIndicateurs} PAR ${this.selectedAxes}`;
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Chart Colors Set
  private getChartColorsArray(colors: any) {
    colors = JSON.parse(colors);
    return colors.map(function (value: any) {
      var newValue = value.replace(" ", "");
      if (newValue.indexOf(",") === -1) {
        var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
        if (color) {
          color = color.replace(" ", "");
          return color;
        } else {
          return newValue;
        }
      }
    });
  }

  private updatePieChart() {
    if (this.results.length === 0) return;
  
    const labels = this.results.map(item => item[0]);
    const series = this.results.map(item => item[1]);
  
    const colors = this.getChartColorsArray('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info","--vz-dark"]');
  
    this.simplePieChart = {
      series: series,
      labels: labels,
      chart: {
        height: 333,
        type: "donut"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: { color: '#858d98' }
      },
      dataLabels: { dropShadow: { enabled: false } },
      colors: colors
    };
  }
  


  

  

  exportToPDFSoll(): void {
    console.log("[PDF] Début export PDF");
  
    const imagePath = 'assets/images/gs2e_logo.jpg';
    const resultType = this.resultType || 'répartition';
  
    fetch(imagePath)
      .then(res => res.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onload = () => {
          const logoData = reader.result as string;
          const doc = new jsPDF();
  
          // --- Logo ---
          doc.addImage(logoData, 'PNG', 10, 3, 40, 50);
  
          // --- Titre ---
          const title = resultType.toUpperCase();
          doc.setFontSize(16);
          doc.setFont('helvetica', 'bold');
          doc.text(title, 105, 50, { align: 'center' });
  
          // --- Tableau dynamique avec pourcentage ---
          if (typeof this.apiTableConfigService.getTableHeaders === 'function') {
            // Récupérer headers dynamiques + ajouter N° et POURCENTAGE
            const originalHeaders = this.apiTableConfigService.getTableHeaders(resultType);
            const headers = [ ...originalHeaders, 'POURCENTAGE'];
  
            // Calcul du total pour la dernière colonne de valeurs numériques (supposée être la 2ème colonne)
            const total = this.results.reduce((sum, row) => sum + (row[1] || 0), 0);
  
            // Construire chaque ligne en respectant l’ordre dynamique
            const data = this.results.map((row, index) => {
              const rowData = [index + 1, ...row]; // N° + données dynamiques
              const pct = total > 0 ? ((row[1] || 0) / total * 100).toFixed(2) + ' %' : '0 %';
              rowData.push(pct);
              return rowData;
            });
  
            autoTable(doc, { head: [headers], body: data, startY: 60, headStyles: {
              fillColor: [26, 189, 156],
              textColor: [255, 255, 255],
              fontStyle: 'bold'
            },
            styles: {
              halign: 'center',
              font: 'helvetica',
              fontSize: 10,
              cellPadding: 3
            } });
          }
  
          // --- Footer ---
          const now = new Date();
          doc.setFontSize(10);
          doc.text(`Généré le ${now.toLocaleDateString()} à ${now.toLocaleTimeString()}`, 10, 290);
  
          doc.save(`${resultType.replace(/\s+/g, '_')}.pdf`);
        };
        reader.readAsDataURL(blob);
      })
      .catch(err => console.error("[PDF] Erreur export PDF", err));
  }

  exportToExcel(): void {
    const ws = XLSX.utils.aoa_to_sheet([
      ['Direction', 'Abonnés'],
      ...this.simplePieChart.labels.map((label: string, index: number) => [label, this.simplePieChart.series[index]])
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Repartition');
    XLSX.writeFile(wb, 'repartition_abonnes.xlsx');
  }

   
  downloadChartImageUsingHtml2Canvas(): void {
    const chartElement = document.getElementById('chart'); // Cibler l'élément du graphique
  
    if (chartElement) {
      // Utiliser html2canvas pour capturer une image de l'élément
      html2canvas(chartElement).then((canvas) => {
        // Convertir le canvas en image (base64 PNG)
        const image = canvas.toDataURL('image/png');
  
        // Créer un lien pour télécharger l'image
        const link = document.createElement('a');
        link.href = image;  // Lien vers l'image
        link.download = 'repartition_abonnes_graphique.png';  // Nom du fichier à télécharger
        link.click();  // Simuler un clic pour télécharger l'image
      });
    } else {
      console.error('Élément de graphique non trouvé');
    }
  }
}
