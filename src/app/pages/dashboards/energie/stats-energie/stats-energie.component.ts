import { Component } from '@angular/core';
import { FaitSuiviEnergieService } from 'src/app/core/services/fait-suivi-energie.service';
import * as XLSX from 'xlsx';  // Import pour Excel
import { saveAs } from 'file-saver';
import { data } from 'jquery';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-stats-energie',
  templateUrl: './stats-energie.component.html',
  styleUrls: ['./stats-energie.component.scss']
})
export class StatsEnergieComponent {
  abonnements: any[] = [];
  loading = false;
  errorMessage = '';

  // ➡️ Pour gérer la pagination :
  currentPage: number = 1; 
  itemsPerPage: number = 5; 


  // ✅ Champs liés à l'input date
  startDate: string | number = '20230101';
  endDate: string | number = '20231230';

  constructor(private faitSuiviEnergieService: FaitSuiviEnergieService) {}

  ngOnInit(): void {
    this.fetchEnergieStats();
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

  fetchEnergieStats(): void {
    this.loading = true;
    this.errorMessage = '';
  
  
    this.faitSuiviEnergieService.getEnergieStatsParDirection(this.startDate.toString(), this.endDate.toString())
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

   // 🔹 Fonction pour exporter en Excel
   exportToExcel(): void {
    if (!this.abonnements || this.abonnements.length === 0) {
      alert("Aucune donnée à exporter !");
      return;
    }

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.abonnements, {
      header: ['Segment', 'Total QWH produit',	'Total QWH livrée',	'Total QWH Consommée',	'Total QWH facturée',	'Total QWH redevance'],
    });

    const workbook: XLSX.WorkBook = { Sheets: { 'Données Energie': worksheet }, SheetNames: ['Données Energie'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(data, 'Statistiques_Energie.xlsx');
  }

  // 🔹 Fonction pour exporter en PDF
  exportToPDF(): void {
    if (!this.abonnements || this.abonnements.length === 0) {
      alert("❌ Aucune donnée à exporter !");
      return;
    }
  
    const doc = new jsPDF();
  
    const title = "STATISTIQUES GENERALES DE L'ENERGIE PAR SEGMENT";
    const fileName = "stats_energie_segment.pdf";
    const logoUrl = "assets/images/gs2e_logo.jpg";
  
    const reader = new FileReader();
  
    fetch(logoUrl)
      .then(res => res.blob())
      .then(blob => {
        reader.readAsDataURL(blob);
        reader.onload = () => {
          const logoData = reader.result as string;
  
          // 🖼️ Ajout du logo
          doc.addImage(logoData, 'PNG', 10, 10, 25, 20); // x, y, width, height
  
          // 🏷️ Titre centré
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(16);
          const pageWidth = doc.internal.pageSize.getWidth();
          const titleWidth = doc.getTextWidth(title);
          const titleX = (pageWidth - titleWidth) / 2;
          doc.text(title, titleX, 40);
  
          // 📄 Données du tableau
          const headers = ['Segment', 'Total QWH produit',	'Total QWH livrée',	'Total QWH Consommée',	'Total QWH facturée',	'Total QWH redevance'];
          const data = this.abonnements.map(abonne => [
            abonne[0], abonne[1], abonne[2], abonne[3], abonne[4], abonne[5]
          ]);
  
          // 📊 Tableau
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
              halign: 'center' // Centrage du contenu des cellules
            },
            alternateRowStyles: {
              fillColor: [240, 240, 240]
            }
          });
  
          // 🕒 Footer avec date/heure
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
  
          // 💾 Enregistrement
          doc.save(fileName);
          console.log("[✅] PDF exporté :", fileName);
        };
      })
      .catch(err => {
        console.error("❌ Erreur lors du chargement du logo :", err);
      });
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
}
