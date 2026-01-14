import { Component } from '@angular/core';
import { FaitSuiviAbonneService } from 'src/app/core/services/fait-suivi-abonne.service';
import * as XLSX from 'xlsx';  // Import pour Excel
import { saveAs } from 'file-saver';
import { data } from 'jquery';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FaitSuiviSollService } from 'src/app/core/services/fait-suivi-soll.service';

@Component({
  selector: 'app-stats-soll',
  templateUrl: './stats-soll.component.html',
  styleUrls: ['./stats-soll.component.scss']
})
export class StatsSollComponent {
  abonnements: any[] = [];
  loading = false;
  errorMessage = '';
  // ➡️ Pour gérer la pagination :
  currentPage: number = 1; 
  itemsPerPage: number = 5;

   // ✅ Champs liés à l'input date
   startDate: string | number = '2020-01-01';
  endDate: string | number = '2022-12-30';

  constructor(private faitSuiviSollService: FaitSuiviSollService) {}

  ngOnInit(): void {
    this.fetchSollStats();
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

  fetchSollStats(): void {
    this.loading = true;
    this.errorMessage = '';
  
    
  
    this.faitSuiviSollService.getSollStatsParType(this.startDate.toString(), this.endDate.toString())
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
      header: ["Direction", "Total Abonnés", "Abonnés Actifs", "Abonnés Résiliés", "Abonnés Facturés", "Abonnés Forfait"],
    });

    const workbook: XLSX.WorkBook = { Sheets: { 'Données Abonnés': worksheet }, SheetNames: ['Données Abonnés'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(data, 'Statistiques_Abonnés.xlsx');
  }

  // 🔹 Fonction pour exporter en PDF
  exportToPDF(): void {
    if (!this.abonnements || this.abonnements.length === 0) {
      alert("Aucune donnée à exporter !");
      return;
    }

    const doc = new jsPDF();
    doc.text("Statistiques des Abonnés", 14, 10);

    autoTable(doc, {
      head: [["Direction", "Total Abonnés", "Actifs", "Résiliés", "Facturés", "Forfait"]],
      body: this.abonnements.map(abonne => [abonne[0], abonne[1], abonne[2], abonne[3], abonne[4], abonne[5]]),
    });

    doc.save('Statistiques_Abonnés.pdf');
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
