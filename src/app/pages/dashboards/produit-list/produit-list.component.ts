import { Component, OnInit } from '@angular/core';
import { dim_produit } from 'src/app/core/models/list-prod.model';
import { dimProduitService } from 'src/app/core/services/list-produit.service';
import * as XLSX from 'xlsx';  // Import pour Excel
import * as FileSaver from 'file-saver';
  // Import pour CSV
import { jsPDF } from 'jspdf';  // Import de jsPDF
import 'jspdf-autotable';  // Import du plugin autoTable pour jsPDF

@Component({
  selector: 'app-produit-list',
  templateUrl: './produit-list.component.html',
  styleUrls: ['./produit-list.component.scss']
})

export class ProduitListComponent implements OnInit {
  produits: dim_produit[] = []; // Pour stocker la liste des produits
  loading: boolean = false; // Pour indiquer si les données sont en cours de chargement
  errorMessage: string | null = null; // Pour stocker les messages d'erreur

  constructor(private produitService: dimProduitService) {}

  ngOnInit(): void {
    this.fetchProduits();
  }

  // Méthode pour récupérer les produits depuis le service
  fetchProduits(): void {
    this.loading = true;
    this.errorMessage = null;
  
    this.produitService.getProduits().subscribe({
      next: (data: dim_produit[]) => {
        console.log('Données reçues de l\'API:', data);  // Log des données retournées
        this.produits = data;
        this.loading = false;
      },
      error: (error) => {
        console.log('Erreur lors de la récupération des produits:', error);  // Log d'erreur si API échoue
        this.errorMessage = 'Erreur lors de la récupération des produits.';
        this.loading = false;
      },
      complete: () => {
        console.log('Chargement des produits terminé.');
      }
    });
  }
  

  // Méthode pour exporter en Excel
  exportToExcel(): void {
    const ws = XLSX.utils.json_to_sheet(this.produits);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Produits');
    XLSX.writeFile(wb, 'produits.xlsx');
  }

  // Méthode pour exporter en CSV
  exportToCSV(): void {
    const csvData = this.convertToCSV(this.produits);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    FileSaver.saveAs(blob, 'produits.csv');
  }

  // Méthode pour convertir en CSV
  private convertToCSV(objArray: any[]): string {
    const array = [Object.keys(objArray[0])].concat(objArray);
    return array.map(row => {
      return Object.values(row).toString();
    }).join('\n');
  }

  // Méthode pour exporter en PDF
  exportToPDF(): void {
    const doc = new jsPDF();
    const headers = ['Id', 'Code', 'Type', 'Usage'];
    const data = this.produits.map(prod => [prod.id_produit, prod.code_produit, prod.type, prod.usage]);

    // Utilisation de autoTable du plugin jspdf-autotable
    (doc as any).autoTable({
      head: [headers],
      body: data
    });

    doc.save('produits.pdf');
  }
}
