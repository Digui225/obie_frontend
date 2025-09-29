import { Component, Input, Output, EventEmitter } from '@angular/core';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-piechart-revenu',
  templateUrl: './piechart-revenu.component.html',
  styleUrls: ['./piechart-revenu.component.scss']
})
export class PiechartRevenuComponent {
  @Output() regionSelected = new EventEmitter<string>(); // Événement pour notifier la sélection d'une région

  constructor() { }

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  simplePieChart: any;
 
      
  
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Charts' }, { label: 'E - Chart', active: true }];

    // Chart Color Data Get Function
    
    this._simplePieChart('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]');
    
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

    // Détails des zones en fonction de la région sélectionnée
  regionDetails: { [key: string]: any[] } = {
    'Abidjan': [['Yopougon', 2300], ['Cocody', 1300], ['Adjame', 1400]],
    'Centre': [['Bouake', 224], ['Yamoussoukro', 431], ['Dimbokro', 392]],
    'Nord': [['Zone 1', 170], ['Zone 2', 200], ['Zone 3', 210]],
    'Ouest': [['Zone 1', 150], ['Zone 2', 175], ['Zone 3', 215]],
    'Est': [['Zone 1', 125], ['Zone 2', 125], ['Zone 3', 50]],
  };

   // Sélection de la région actuelle
   selectedRegion: string = 'Ouest'; // Initialisation des details par defaut

   // Calcul du total des abonnés pour la région sélectionnée
  getTotalRevenus(region: string): number {
    if (!this.regionDetails[region]) return 0;
    return this.regionDetails[region].reduce((acc: number, detail: any) => {
      return acc + detail[1]; // Additionne les Revenus pour chaque localité
    }, 0);
  }

   // Calcul du pourcentage pour chaque localité
  calculatePercentage(revenus: number): string {
    const totalrevenus = this.getTotalRevenus(this.selectedRegion); // Total des abonnés pour la région sélectionnée
    if (totalrevenus === 0) return '0.00'; // Si le total est zéro, retourne 0%
    const percentage = ((revenus / totalrevenus) * 100).toFixed(2); // Calcul du pourcentage
    return percentage; // Retourne le pourcentage en format string
  }

  // Logic for when a region is selected
  onRegionSelected(region: string): void {
    // Si la région cliquée est déjà sélectionnée, on la désélectionne (ferme le tableau)
    if (this.selectedRegion === region) {
      this.selectedRegion = '';  // Désélectionner la région et masquer les détails
    } else {
      this.selectedRegion = region;  // Sélectionner la nouvelle région
    }
    this.regionSelected.emit(this.selectedRegion);  // Émettre l'événement avec la région sélectionnée (vide si aucune sélection)
  }

   /**
 * Simple Pie Chart
 */
   private _simplePieChart(colors:any) {
    colors = this.getChartColorsArray(colors);
    this.simplePieChart = {
      series: [1048, 735, 580, 484, 300],
      chart: {
        height: 360,
        type: "pie",
        events: {
          dataPointSelection: (event: any, chartContext: any, config: any) => {
            const regions = ["Abidjan", "Centre", "Nord", "Ouest", "Est"];
            this.onRegionSelected(regions[config.dataPointIndex]); // Sélectionner la région et émettre
          },
        },
      },
      labels: ["Abidjan", "Centre", "Nord", "Ouest", "Est"],
      legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: { //The style of the legend text
            color: '#858d98',
        },
    },
      dataLabels: {
        dropShadow: {
          enabled: false,
        },
      },
      colors: colors,
    };
  }

  // Méthodes pour exporter les données (comme dans ton code d'origine)

  private convertToCSV(): string {
    const header = ['Direction', 'Revenus'];
    const rows = this.simplePieChart.labels.map((label: string, index: number) => {
      return [label, this.simplePieChart.series[index]].join(',');
    });
    return [header.join(','), ...rows].join('\n');
  }
  exportToCSV(): void {
    const csvData = this.convertToCSV();
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'repartition_revenus.csv');
  }

   // Méthode pour exporter en CSV les détails de la région, y compris les pourcentages
    exportToCSVRegion(): void {
      if (!this.selectedRegion || !this.regionDetails[this.selectedRegion]) return;

      const csvData = this.convertToCSVRegion();
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, `${this.selectedRegion}_details.csv`);
    }

    private convertToCSVRegion(): string {
      const header = ['Localité', 'Revenus', 'Pourcentage'];

      // Préparation des lignes du CSV avec le calcul du pourcentage
      const rows = this.regionDetails[this.selectedRegion].map((detail: any) => {
        const pourcentage = this.calculatePercentage(Number(detail[1])); // Calcul du pourcentage pour chaque localité
        return [detail[0], detail[1], pourcentage].join(',');
      });

      // Retourner le CSV sous forme de chaîne de caractères
      return [header.join(','), ...rows].join('\n');
    }

  

  

  //Methode PDF
  exportToPDF(): void {
    const doc = new jsPDF();
    const title = 'REPARTITION DES revenus PAR DIRECTION';

    doc.setFont('helvetica', 'bold');
    const pageWidth = doc.internal.pageSize.getWidth();
    const titleWidth = doc.getTextWidth(title);
    const titleX = (pageWidth - titleWidth) / 2;
    
    doc.setFontSize(18);
    doc.text(title, titleX, 20);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('', 20, 30);
    
    // Calculer le total des revenus
    const totalRevenus = this.simplePieChart.series.reduce((acc: number, value: number) => acc + value, 0);
    const headers = ['Direction', 'Revenus', 'Pourcentage'];
     // Préparer les données du tableau avec pourcentage
    const data = this.simplePieChart.labels.map((label: string, index: number) => {
      const revenus = this.simplePieChart.series[index];
      const pourcentage = ((revenus / totalRevenus) * 100).toFixed(2); // Calcul du pourcentage
      return [label, revenus, `${pourcentage}%`]; // Ajoute le pourcentage à chaque ligne
    });

    (doc as any).autoTable({
      head: [headers],
      body: data,
      startY: 40
    });

    doc.save('repartition_revenus.pdf');
  }

  exportToPDFRegion(): void {
    if (!this.selectedRegion || !this.regionDetails[this.selectedRegion]) return;
  
    const doc = new jsPDF();
    const title = `Détails de la direction: ${this.selectedRegion}`;
  
    // Titre du document
    doc.setFont('helvetica', 'bold');
    const pageWidth = doc.internal.pageSize.getWidth();
    const titleWidth = doc.getTextWidth(title);
    const titleX = (pageWidth - titleWidth) / 2;
  
    doc.setFontSize(18);
    doc.text(title, titleX, 20);
  
    // Corps du document
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('', 20, 30);
  
    // Calculer le total des abonnés dans la région sélectionnée
    const totalRevenusRegion = this.regionDetails[this.selectedRegion].reduce((acc: number, detail: any) => {
      // Assurez-vous que detail[1] est un nombre (si c'est une chaîne, la convertir en nombre)
      const revenus = parseInt(detail[1], 10); // Convertir directement en entier
      return acc + revenus;
    }, 0);
  
    // Créer les en-têtes du tableau
    const headers = ['Localité', 'Revenus', 'Pourcentage'];
    const footer = ['Total']
  
    // Préparer les données du tableau avec pourcentage
    const data = this.regionDetails[this.selectedRegion].map((detail: any) => {
      const localite = detail[0];
      const revenus = parseInt(detail[1], 10); // Assurez-vous que c'est un nombre
      const pourcentage = ((revenus / totalRevenusRegion) * 100).toFixed(2); // Calculer le pourcentage
      return [localite, revenus, `${pourcentage}%`]; // Ajouter le pourcentage sous forme de chaîne de caractères
    });
  
    // Ajouter le tableau au PDF
    (doc as any).autoTable({
      head: [headers],
      body: data,
      foot: [footer],
      startY: 40
    });
  
    // Sauvegarder le fichier PDF
    doc.save(`${this.selectedRegion}_details.pdf`);
  }

  //Methode Excel
  exportToExcel(): void {
    const ws = XLSX.utils.aoa_to_sheet([
      ['Direction', 'Revenus'],
      ...this.simplePieChart.labels.map((label: string, index: number) => [label, this.simplePieChart.series[index]])
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Repartition');
    XLSX.writeFile(wb, 'repartition_abonnes.xlsx');
  }

  // methode excel de telechargement des details par region
  exportToExcelRegion(): void {
    if (!this.selectedRegion || !this.regionDetails[this.selectedRegion]) return;
  
    // Calculez le total des abonnés pour la région sélectionnée
    const totalAbonnes = this.getTotalRevenus(this.selectedRegion);
  
    // Préparez les données à exporter, y compris les pourcentages
    const dataToExport = [
      ['Localité', 'Revenus', 'Pourcentage'],  // En-tête
      ...this.regionDetails[this.selectedRegion].map((detail: any) => {
        // Calculez le pourcentage pour chaque localité
        const pourcentage = this.calculatePercentage(detail[1]);
        return [detail[0], detail[1], `${pourcentage}%`];  // Ajoutez le pourcentage aux données
      })
    ];
  
    // Créez la feuille de calcul
    const ws = XLSX.utils.aoa_to_sheet(dataToExport);
  
    // Créez le fichier Excel et ajoutez la feuille
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `${this.selectedRegion} Détails`);
  
    // Téléchargez le fichier Excel
    XLSX.writeFile(wb, `${this.selectedRegion}_details.xlsx`);
  }
}
