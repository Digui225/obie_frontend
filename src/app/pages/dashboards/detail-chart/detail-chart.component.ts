import { Component, EventEmitter, Output } from '@angular/core';
import { saveAs } from 'file-saver';  // Import de FileSaver.js pour gérer le téléchargement
import * as XLSX from 'xlsx';  // Pour exporter en Excel
import { jsPDF } from 'jspdf';  // Pour exporter en PDF
import 'jspdf-autotable';  // Pour utiliser autoTable dans jsPDF

@Component({
  selector: 'app-detail-chart',
  templateUrl: './detail-chart.component.html',
  styleUrls: ['./detail-chart.component.scss']
})
export class DetailChartComponent {
  @Output() regionSelected = new EventEmitter<string>(); // Événement pour notifier la sélection d'une région


  constructor() {}

  // Détails des zones en fonction de la région sélectionnée
  regionDetails: { [key: string]: any[] } = {
    'Abidjan': [['Yopougon', 2300], ['Cocody', 1300], ['Adjame', 1400]],
    'Centre': [['Bouake', 224], ['Yamoussoukro', 431], ['Dimbokro', 392]],
    'Nord': [['Zone 1', 170], ['Zone 2', 200], ['Zone 3', 210]],
    'Ouest': [['Zone 1', 150], ['Zone 2', 175], ['Zone 3', 215]],
    'Est': [['Zone 1', 125], ['Zone 2', 125], ['Zone 3', 50]],
  };

  // Sélection de la région actuelle
  selectedRegion: string = '';

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

  // Méthode pour exporter en CSV les détails de la région, y compris les pourcentages
  exportToCSVRegion(): void {
    if (!this.selectedRegion || !this.regionDetails[this.selectedRegion]) return;

    const csvData = this.convertToCSVRegion();
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, `${this.selectedRegion}_details.csv`);
  }

  private convertToCSVRegion(): string {
    const header = ['Localité', 'Abonnés', 'Pourcentage'];

    // Préparation des lignes du CSV avec le calcul du pourcentage
    const rows = this.regionDetails[this.selectedRegion].map((detail: any) => {
      const pourcentage = this.calculatePercentage(Number(detail[1])); // Calcul du pourcentage pour chaque localité
      return [detail[0], detail[1], pourcentage].join(',');
    });

    // Retourner le CSV sous forme de chaîne de caractères
    return [header.join(','), ...rows].join('\n');
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
  
}
