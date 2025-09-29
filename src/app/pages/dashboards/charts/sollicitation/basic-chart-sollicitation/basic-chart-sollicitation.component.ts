import { Component } from '@angular/core';
import html2canvas from 'html2canvas';

import { saveAs } from 'file-saver';  // Pour gérer les téléchargements
import * as XLSX from 'xlsx';  // Pour l'export Excel
import { jsPDF } from 'jspdf';  // Pour l'export PDF
import 'jspdf-autotable';  // Pour utiliser autoTable dans jsPDF
import { FaitSuiviSollService } from 'src/app/core/services/fait-suivi-soll.service';

@Component({
  selector: 'app-basic-chart-sollicitation',
  templateUrl: './basic-chart-sollicitation.component.html',
  styleUrls: ['./basic-chart-sollicitation.component.scss']
})
export class BasicChartSollicitationComponent {

    // bread crumb items
    breadCrumbItems!: Array<{}>;
    basicChart: any;

    // ✅ Champs liés à l'input date
      startDate: string = '2024-01-01';
      endDate: string = '2024-12-30';
    
  
    constructor(private faitSuiviSollService : FaitSuiviSollService) { }
  
   
  ngOnInit(): void {
    // BreadCrumb
    this.breadCrumbItems = [
      { label: 'Apexcharts' },
      { label: 'Column Charts', active: true }
    ];

    /* const startDate = '2023-01-01';
    const endDate = '2023-12-31'; */
  
    this.loadChartData()

    // Initialisation du graphique
    //this._basicChart('["--vz-danger", "--vz-primary", "--vz-success"]');
  }
  
    private getChartColorsArray(colors:any) {
      colors = JSON.parse(colors);
      return colors.map(function (value:any) {
        var newValue = value.replace(" ", "");
        if (newValue.indexOf(",") === -1) {
          var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
              if (color) {
              color = color.replace(" ", "");
              return color;
              }
              else return newValue;;
          } else {
              var val = value.split(',');
              if (val.length == 2) {
                  var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
                  rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
                  return rgbaColor;
              } else {
                  return newValue;
              }
          }
      });
    }

    loadChartData(): void {
    if (!this.startDate || !this.endDate) {
      alert('Veuillez choisir une période valide');
      return;
    }
  
    this.faitSuiviSollService.getSollStatsParMois(this.startDate, this.endDate).subscribe({
      next: (data) => {
        this.processTypeChartData(data);
      },
      error: (err) => {
        console.error('Erreur lors du chargement du graphique :', err);
      }
    });
  }

  processTypeChartData(data: any[]): void {
      const moisLabels: string[] = [];
      const Nombre: number[] = [];
      const delai: number[] = [];
      const hors_delai: number[] = [];
    
      data.forEach(row => {
        moisLabels.push(row[0]);
        Nombre.push(row[2] || 0);
        delai.push(row[1] || 0);
        hors_delai.push(row[3] || 0);
      });
    
      this._basicChart(
        '["--vz-primary", "--vz-success", "--vz-warning"]',
        moisLabels,
        Nombre,
        delai,
        hors_delai
      );
    }
  
     /**
   * Configuration du graphique (Graphique en colonnes)
   */
  private _basicChart(
    colors: any,
    categories: string[],
    delai: number[],
    Nombre: number[],
    hors_delai: number[]
  ) {
    colors = this.getChartColorsArray(colors);
  
    this.basicChart = {
      series: [
        {
          name: "Nombre de sollicitations",
          data: Nombre,
        },
        {
          name: "Taux de resolution dans delais",
          data: delai,
        },
        
        {
          name: "Taux de resolution hors delais",
          data: hors_delai,
        }, 
      ],
      chart: {
        height: 390,
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "45%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      colors: colors,
      xaxis: {
        categories: categories,
      },
      yaxis: {
        title: {
          text: "Nombre Total",
        },
      },
      grid: {
        borderColor: "#f1f1f1",
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val + " Sollicitations";
          },
        },
      },
    };
  }

      /**
   * Exporter les données en CSV
   */
  /* exportToCSV(): void {
    const csvData = this.convertToCSV();
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'repartition_sollicitations.csv');
  } */

  /**
   * Convertir les données en CSV
   */
 /*  private convertToCSV(): string {
    const header = ['Mois', 'Taux de resolution dans les delais', 'Nombre total', 'Taux de resolution hors-delais'];
    const rows = this.basicChart.xaxis.categories.map((category: string, index: number) => {
      return [
        category,
        this.basicChart.series[0].data[index],
        this.basicChart.series[1].data[index],
        this.basicChart.series[2].data[index]
      ].join(',');
    });
    return [header.join(','), ...rows].join('\n');
  } */

  /**
   * Exporter les données en PDF
   */
  exportToPDF(): void {
    const reader = new FileReader();
    const imagePath = 'assets/images/gs2e_logo.jpg';
  
    fetch(imagePath)
      .then(res => res.blob())
      .then(blob => {
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const logoData = reader.result as string;
          this.generatePDFWithLogo(logoData);
        };
      });
  }
  
  generatePDFWithLogo(logoData: string): void {
    const doc = new jsPDF();
  
    // 🖼️ Logo
    doc.addImage(logoData, 'PNG', 10, 10, 30, 15);
  
    // 🏷️ Titre centré
    const title = 'REPARTITION DES SOLLICITATIONS';
    const pageWidth = doc.internal.pageSize.getWidth();
    const titleWidth = doc.getTextWidth(title);
    const titleX = (pageWidth - titleWidth) / 2;
  
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(title, titleX, 40);
  
    // 📊 Données
    const headers = ['Mois', 'Taux de resolution dans les delais', 'Nombre total', 'Taux de resolution hors-delais'];
    const data = this.basicChart.xaxis.categories.map((category: string, index: number) => [
      category,
      this.basicChart.series[0].data[index],
      this.basicChart.series[1].data[index],
      this.basicChart.series[2].data[index]
    ]);
  
    // 📄 Tableau
    (doc as any).autoTable({
      head: [headers],
      body: data,
      startY: 50,
      theme: 'grid',
      headStyles: {
        fillColor: [26, 189, 156],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      styles: {
        font: 'helvetica',
        fontSize: 10,
        cellPadding: 3
      }
    });
  
    // 🕒 Date et heure d'export
    const now = new Date();
    const formattedDate = now.toLocaleDateString();   // Format local, ex : 24/07/2025
    const formattedTime = now.toLocaleTimeString();   // Ex : 11:45:00
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Exporté le ${formattedDate} à ${formattedTime}`, 10, 285); // bas gauche
  
    // 💾 Sauvegarde
    doc.save('repartition_sollicitaion.pdf');
  }
  
  
  

  /**
   * Exporter les données en Excel
   */
  exportToExcel(): void {
    const ws = XLSX.utils.aoa_to_sheet([
      ['Mois', 'Taux de resolution dans les delais', 'Nombre total', 'Taux de resolution hors-delais'],
      ...this.basicChart.xaxis.categories.map((category: string, index: number) => [
        category,
        this.basicChart.series[0].data[index],
        this.basicChart.series[1].data[index],
        this.basicChart.series[2].data[index]
      ])
    ]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Repartition');
    XLSX.writeFile(wb, 'repartition_sollicitations.xlsx');
  }

  downloadChartImageUsingHtml2Canvas(): void {
    const chartElement = document.getElementById('chart1'); // Cibler l'élément du graphique
  
    if (chartElement) {
      // Utiliser html2canvas pour capturer une image de l'élément
      html2canvas(chartElement).then((canvas) => {
        // Convertir le canvas en image (base64 PNG)
        const image = canvas.toDataURL('image/png');
  
        // Créer un lien pour télécharger l'image
        const link = document.createElement('a');
        link.href = image;  // Lien vers l'image
        link.download = 'repartition_sollicitations_graphique.png';  // Nom du fichier à télécharger
        link.click();  // Simuler un clic pour télécharger l'image
      });
    } else {
      console.error('Élément de graphique non trouvé');
    }
  }
}
