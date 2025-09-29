import { Component } from '@angular/core';
import { FaitSuiviAbonneService } from 'src/app/core/services/fait-suivi-abonne.service';
import * as XLSX from 'xlsx';  // Import pour Excel
import { saveAs } from 'file-saver';
import { data } from 'jquery';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-stats-abonne',
  templateUrl: './stats-abonne.component.html',
  styleUrls: ['./stats-abonne.component.scss']
})
export class StatsAbonneComponent {
  abonnements: any[] = [];
  loading = false;
  errorMessage = '';

  // ✅ Champs liés à l'input date
  startDate: string = '2020-01-01';
  endDate: string = '2022-12-30';

  constructor(private faitSuiviAbonneService: FaitSuiviAbonneService) {}

  
  // ➡️ Pour gérer la pagination :
  currentPage: number = 1; 
  itemsPerPage: number = 5; 

  ngOnInit(): void {
    this.fetchAbonneStats(); // initial
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
  

  fetchAbonneStats(): void {
    if (!this.startDate || !this.endDate) {
      this.errorMessage = 'Veuillez sélectionner une période valide.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.faitSuiviAbonneService.getAbonneStatsParDirection(this.startDate, this.endDate)
      .subscribe({
        next: (data) => {
          console.log('Données récupérées :', data);
          this.abonnements = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Erreur API:', err);
          this.errorMessage = 'Erreur lors du chargement des données.';
          this.loading = false;
        }
      });
  }

  onDetailsClick(abonne: any): void {
    alert(`Afficher les détails pour : ${abonne.libDirection}`);
  }

  exportToExcel(): void {
    console.log("[📥] Début exportation Excel...");
  
    if (!this.abonnements || this.abonnements.length === 0) {
      alert("Aucune donnée à exporter !");
      console.warn("[⚠️] Aucune donnée à exporter vers Excel.");
      return;
    }
  
    console.log("[📊] Données à exporter :", this.abonnements);
  
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.abonnements, {
      header: ["Direction", "Total Abonnés", "Abonnés Actifs", "Abonnés Résiliés", "Abonnés Facturés", "Abonnés Forfait"],
    });
    console.log("[📄] Feuille Excel créée.");
  
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Données Abonnés': worksheet },
      SheetNames: ['Données Abonnés']
    };
    console.log("[📚] Classeur Excel prêt.");
  
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    console.log("[📦] Données Excel converties en buffer.");
  
    const data: Blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    });
  
    saveAs(data, 'Statistiques_Abonnés.xlsx');
    console.log("[✅] Fichier Excel téléchargé : Statistiques_Abonnés.xlsx");
  }
  

  exportToPDF(): void {
    console.log("[📥] Début exportation PDF...");
  
    if (!this.abonnements || this.abonnements.length === 0) {
      alert("Aucune donnée à exporter !");
      console.warn("[⚠️] Aucune donnée à exporter vers PDF.");
      return;
    }
  
    const doc = new jsPDF();
    const resultType = 'statistiques-abonnes';
    const capitalizedTitle = resultType
      .split('-')
      .map(part => part.trim().charAt(0).toUpperCase() + part.trim().slice(1))
      .join(' - ');
    const fileName = resultType.replace(/\s+/g, '_') + '.pdf';
  
    const logoUrl = 'assets/images/gs2e_logo.jpg';
    const reader = new FileReader();
  
    fetch(logoUrl)
      .then(response => response.blob())
      .then(blob => {
        reader.readAsDataURL(blob);
        reader.onload = () => {
          const logoData = reader.result as string;
  
          // Logo
          doc.addImage(logoData, 'PNG', 10, 10, 40, 15);
  
          // Titre centré
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(16);
          const pageWidth = doc.internal.pageSize.getWidth();
          const titleWidth = doc.getTextWidth(capitalizedTitle);
          const titleX = (pageWidth - titleWidth) / 2;
          doc.text(capitalizedTitle, titleX, 40);
  
          // Table headers
          const headers = [["Direction", "Total Abonnés", "Actifs", "Résiliés", "Facturés", "Forfait"]];
  
          // Body
          const body = this.abonnements.map((abonne, index) => [
            abonne[0], abonne[1], abonne[2], abonne[3], abonne[4], abonne[5]
          ]);
  
          autoTable(doc, {
            head: headers,
            body: body,
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
              halign: 'center' // Centrage du contenu des cellules
            }   
          });
  
          // Footer date
          const currentDate = new Date();
          const formattedDate = currentDate.toLocaleString('fr-FR', {
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
          console.log("[✅] Fichier PDF téléchargé :", fileName);
        };
      })
      .catch(error => {
        console.error('Erreur lors du chargement du logo :', error);
      });
  }
  
  
}


/* 
          getStatsDir(): void {
            this.loading = true;
            this.errorMessage = '';
          
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 30); // 30 jours avant aujourd'hui
            const startDateStr = startDate.toISOString().split('T')[0];
            const endDateStr = new Date().toISOString().split('T')[0]; // Date actuelle
          
            this.faitSuiviAbonneService.getAbonneStatsParDirection(startDateStr, endDateStr)
              .subscribe({
                next: (data) => {
                  this.abonnements = data;
                  this.loading = false;
                },
                error: (err) => {
                  console.error('Erreur lors de la récupération des abonnés :', err);
                  this.errorMessage = 'Impossible de charger les données.';
                  this.loading = false;
                }
              });
          }
          
          onDetailsClick(abonne: any[]): void {
            console.log('Détails de la direction sélectionnée :', abonne);
          }*/