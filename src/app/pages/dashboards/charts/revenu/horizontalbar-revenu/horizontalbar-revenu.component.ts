import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';  // Pour l'exportation Excel
import { jsPDF } from 'jspdf';  // Pour l'exportation PDF
import 'jspdf-autotable';  // Pour utiliser autoTable dans jsPDF

@Component({
  selector: 'app-horizontalbar-revenu',
  templateUrl: './horizontalbar-revenu.component.html',
  styleUrls: ['./horizontalbar-revenu.component.scss']
})
export class HorizontalbarRevenuComponent {
  constructor() { }

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  StackedHorizontalBarChart:any;
  
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Charts' }, { label: 'E - Chart', active: true }];

    // Chart Color Data Get Function
    this._StackedHorizontalBarChart('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]');
    
  }

  // Méthode pour récupérer les données du graphique sous un format adapté
  private getChartData(): any[] {
    const categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const series = this.StackedHorizontalBarChart.series;

    const result: any[] = [];
    categories.forEach((category, index) => {
      const row: any = { 'Jour': category };  // Ajouter la colonne "Jour"
      series.forEach((serie: any) => {
        row[serie.name] = serie.data[index];  // Ajouter les valeurs de chaque série sous le nom de la série
      });
      result.push(row);
    });
    return result;
  }

  // Exporter en CSV
  exportToCSV(): void {
    const data = this.getChartData();
    const headers = Object.keys(data[0]).join(',');  // Récupérer les noms des colonnes
    const rows = data.map(row => Object.values(row).join(','));  // Récupérer les valeurs des lignes

    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {  // Vérifier si le navigateur prend en charge le téléchargement
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'repartition_montant_factures.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  // Exporter en Excel
  exportToExcel(): void {
    const data = this.getChartData();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);  // Convertir les données en feuille Excel
    const wb: XLSX.WorkBook = { Sheets: { 'Sheet1': ws }, SheetNames: ['Sheet1'] };  // Créer un classeur
    XLSX.writeFile(wb, 'repartition_montant_factures.xlsx');  // Exporter le fichier Excel
  }

  // Exporter en PDF
  exportToPDF(): void {
    const doc = new jsPDF();
    const data = this.getChartData();

    // Titre
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('REPARTITION PAR MONTANT DES FACTURES', 20, 20);

    // Table headers
    const headers = Object.keys(data[0]);

    // Data for the table
    const tableData = data.map(row => Object.values(row));

    // Créer un tableau
    (doc as any).autoTable({
        head: [headers],
      body: tableData,
      startY: 30, // Commencer à partir de Y=30 pour éviter de chevaucher le titre
      theme: 'grid',
      })

    // Sauvegarder le fichier PDF
    doc.save('repartition_montant_factures.pdf');
  }

  


   // Chart Colors Set
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

    // StackedHorizontalBarChart
    private _StackedHorizontalBarChart(colors:any) {
      colors = this.getChartColorsArray(colors);
      this.StackedHorizontalBarChart = {
          tooltip: {
          trigger: 'axis',
          axisPointer: {
              // Use axis to trigger tooltip
              type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          }
      },
      legend: {
          textStyle: { //The style of the legend text
              color: '#858d98',
          },
      },
      grid: {
          left: '1%',
          right: '3%',
          bottom: '0%',
          containLabel: true
      },
      xAxis: {
          type: 'value',
          axisLine: {
              lineStyle: {
                  color: '#858d98'
              },
          },
          splitLine: {
              lineStyle: {
                  color: "rgba(133, 141, 152, 0.1)"
              }
          }
      },
      color: colors,
      yAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisLine: {
              lineStyle: {
                  color: '#858d98'
              },
          },
          splitLine: {
              lineStyle: {
                  color: "rgba(133, 141, 152, 0.1)"
              }
          }
      },
      textStyle: {
          fontFamily: 'Poppins, sans-serif'
      },
      series: [/* {
        name: 'Migrés',
        type: 'bar',
        stack: 'total',
        label: {
            show: true
        },
        emphasis: {
            focus: 'series'
        },
        data: [320, 302, 301, 334, 390, 330, 320]
    }, */
    {
        name: 'Remboursés',
        type: 'bar',
        stack: 'total',
        label: {
            show: true
        },
        emphasis: {
            focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
        name: 'Avoirs',
        type: 'bar',
        stack: 'total',
        label: {
            show: true
        },
        emphasis: {
            focus: 'series'
        },
        data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
        name: 'Impayés',
        type: 'bar',
        stack: 'total',
        label: {
            show: true
        },
        emphasis: {
            focus: 'series'
        },
        data: [150, 212, 201, 154, 190, 330, 410]
    },
    {
        name: 'Encaissé',
        type: 'bar',
        stack: 'total',
        label: {
            show: true
        },
        emphasis: {
            focus: 'series'
        },
        data: [820, 832, 901, 934, 1290, 1330, 1320]
    }
    ]
      };
  }

  downloadChartImageUsingHtml2Canvas(): void {
    const chartElement = document.getElementById('chart_hor_bar'); // Cibler l'élément du graphique
  
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
