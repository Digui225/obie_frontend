import { Component, EventEmitter,Input, OnInit, Output } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChartType } from '../../../dashboard/dashboard.model';

import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { FaitSuiviAbonneService } from 'src/app/core/services/fait-suivi-abonne.service';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit{
   @Input() start!: string;
  @Input() end!: string;

  @Output() regionSelected = new EventEmitter<string>();

  SalesCategoryChart: any;
  isLoading: boolean = false;
  hasError: boolean = false;

  constructor(private faitSuiviAbonneService: FaitSuiviAbonneService) {}

  ngOnInit(): void {
    if (this.start && this.end) {
      this.loadChartData();
    }
  }

  private loadChartData(): void {
    this.isLoading = true;
    this.hasError = false;

    this.faitSuiviAbonneService.getAbonneTotalByDimension('direction', this.start, this.end)
      .subscribe({
        next: (data) => {
          this.prepareSalesCategoryChart(data);
          console.log('Graph data:', this.SalesCategoryChart); // vérifie ici
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Erreur récupération données donut :', err);
          this.hasError = true;
          this.isLoading = false;
        }
      });
  }

  private prepareSalesCategoryChart(data: [string, number][]): void {
    const labels = data.map(item => item[0]);
    const series = data.map(item => item[1]);
    const colors = this.getChartColorsArray('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]');

    this.SalesCategoryChart = {
      series: series,
      labels: labels,
      chart: {
        height: 333,
        type: "donut",
        events: {
          dataPointSelection: (_event: any, _ctx: any, config: any) => {
            this.regionSelected.emit(labels[config.dataPointIndex]);
          }
        },
        toolbar: { show: false }
      },
      legend: {
        position: "bottom"
      },
      stroke: {
        show: false
      },
      dataLabels: {
        dropShadow: {
          enabled: false
        }
      },
      colors: colors
    };
  }

  private getChartColorsArray(colors: any): string[] {
    colors = JSON.parse(colors);
    return colors.map((value: string) => {
      const newValue = value.replace(" ", "");
      if (newValue.indexOf(",") === -1) {
        const color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
        return color?.trim() || newValue;
      } else {
        const val = value.split(',');
        const rgbaBase = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
        return `rgba(${rgbaBase.trim()},${val[1]})`;
      }
    });
  }

      exportToPDF(): void {
      const doc = new jsPDF();
      const title = 'REPARTITION DES ABONNES PAR DIRECTION';

      doc.setFont('helvetica', 'bold');
      const pageWidth = doc.internal.pageSize.getWidth();
      const titleWidth = doc.getTextWidth(title);
      const titleX = (pageWidth - titleWidth) / 2;
      
      doc.setFontSize(18);
      doc.text(title, titleX, 20);

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text('', 20, 30);
      
      // Calculer le total des abonnés
      const totalAbonnes = this.SalesCategoryChart.series.reduce((acc: number, value: number) => acc + value, 0);
      const headers = ['Direction', 'Abonnés', 'Pourcentage'];
      // Préparer les données du tableau avec pourcentage
      const data = this.SalesCategoryChart.labels.map((label: string, index: number) => {
        const abonnes = this.SalesCategoryChart.series[index];
        const pourcentage = ((abonnes / totalAbonnes) * 100).toFixed(2); // Calcul du pourcentage
        return [label, abonnes, `${pourcentage}%`]; // Ajoute le pourcentage à chaque ligne
      });

      (doc as any).autoTable({
        head: [headers],
        body: data,
        startY: 40
      });

      doc.save('repartition_abonnes.pdf');
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
      const totalAbonnesRegion = this.regionDetails[this.selectedRegion].reduce((acc: number, detail: any) => {
        // Assurez-vous que detail[1] est un nombre (si c'est une chaîne, la convertir en nombre)
        const abonnes = parseInt(detail[1], 10); // Convertir directement en entier
        return acc + abonnes;
      }, 0);

      // Créer les en-têtes du tableau
      const headers = ['Localité', 'Abonnés', 'Pourcentage'];
      const footer = ['Total']

      // Préparer les données du tableau avec pourcentage
      const data = this.regionDetails[this.selectedRegion].map((detail: any) => {
        const localite = detail[0];
        const abonnes = parseInt(detail[1], 10); // Assurez-vous que c'est un nombre
        const pourcentage = ((abonnes / totalAbonnesRegion) * 100).toFixed(2); // Calculer le pourcentage
        return [localite, abonnes, `${pourcentage}%`]; // Ajouter le pourcentage sous forme de chaîne de caractères
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

    exportToExcel(): void {
      const ws = XLSX.utils.aoa_to_sheet([
        ['Direction', 'Abonnés'],
        ...this.SalesCategoryChart.labels.map((label: string, index: number) => [label, this.SalesCategoryChart.series[index]])
      ]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Repartition');
      XLSX.writeFile(wb, 'repartition_abonnes.xlsx');
    }

    // methode excel de telechargement des details par region
    exportToExcelRegion(): void {
      if (!this.selectedRegion || !this.regionDetails[this.selectedRegion]) return;

      // Calculez le total des abonnés pour la région sélectionnée
      const totalAbonnes = this.getTotalAbonnes(this.selectedRegion);

      // Préparez les données à exporter, y compris les pourcentages
      const dataToExport = [
        ['Localité', 'Abonnés', 'Pourcentage'],  // En-tête
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


    //Fin Telechargement rapport

    // Détails des zones en fonction de la région sélectionnée
    regionDetails: { [key: string]: any[] } = {
      'Abidjan': [['Yopougon', 206877], ['Cocody', 127000], ['Adjame', 71679]],
      'Centre': [['Bouake', 110000], ['Yamoussoukro', 118159], ['Dimbokro', 125318]],
      'Nord': [['Zone 1', 84000], ['Zone 2', 105000], ['Zone 3', 107110]],
      'Ouest': [['Zone 1', 65000], ['Zone 2', 90000], ['Zone 3', 95000]],
      'Est': [['Zone 1', 40000], ['Zone 2', 60000], ['Zone 3', 50000]],
    };

    // Sélection de la région actuelle
    selectedRegion: string = 'Abidjan';

    // Calcul du total des abonnés pour la région sélectionnée
    getTotalAbonnes(region: string): number {
      if (!this.regionDetails[region]) return 0;
      return this.regionDetails[region].reduce((acc: number, detail: any) => {
        return acc + detail[1]; // Additionne les abonnés pour chaque localité
      }, 0);
    }

    // Calcul du pourcentage pour chaque localité
    calculatePercentage(abonnes: number): string {
      const totalAbonnes = this.getTotalAbonnes(this.selectedRegion); // Total des abonnés pour la région sélectionnée
      if (totalAbonnes === 0) return '0.00'; // Si le total est zéro, retourne 0%
      const percentage = ((abonnes / totalAbonnes) * 100).toFixed(2); // Calcul du pourcentage
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

    downloadChartImageUsingHtml2Canvas(): void {
    const chartElement = document.getElementById('chart_dash'); // Cibler l'élément du graphique
  
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
