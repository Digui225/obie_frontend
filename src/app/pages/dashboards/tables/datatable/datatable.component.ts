import { Component, OnInit } from '@angular/core';
import { dim_produit } from 'src/app/core/models/list-prod.model';
import { dimProduitService } from 'src/app/core/services/list-produit.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent {
  tableData: any[] = []; // Données du tableau récupérées depuis l'API
  searchQuery: string = ''; // Recherche de l'utilisateur
  currentPage: number = 1; // Page actuelle de la pagination
  pageSize: number = 5; // Nombre d'éléments par page

  constructor(private produitService: dimProduitService) {}

  ngOnInit() {
    // Récupérer les données dès que le composant est initialisé
    this.produitService.getProduits().subscribe(data => {
      this.tableData = data; // Stocker les données dans le tableau
    });
  }

  // Filtrer les données en fonction de la recherche
  get filteredData() {
    return this.tableData.filter(item =>
      Object.values(item).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    );
  }
  

  // Exporter en Excel
  exportToExcel() {
    const ws = XLSX.utils.json_to_sheet(this.filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'table_data.xlsx');
  }

  // Exporter en CSV
  exportToCSV() {
    const csvData = this.convertToCSV(this.filteredData);
    const blob = new Blob([csvData], { type: 'text/csv' });
    FileSaver.saveAs(blob, 'table_data.csv');
  }

  // Exporter en PDF
  exportToPDF() {
    const doc = new jsPDF();
    let y = 10;

    // Ajouter les titres de colonnes
    const columnTitles = ['Colonne 1', 'Colonne 2', 'Colonne 3', 'Colonne 4', 'Colonne 5'];
    doc.text(columnTitles.join(' | '), 10, y);
    y += 10;

    // Ajouter les lignes du tableau
    this.filteredData.forEach(item => {
      const row = [
        item.col1,
        item.col2,
        item.col3,
        item.col4,
        item.col5
      ];
      doc.text(row.join(' | '), 10, y);
      y += 10;
    });

    doc.save('table_data.pdf');
  }

  // Fonction pour convertir les données en format CSV
  convertToCSV(data: any[]) {
    const columnTitles = ['col1', 'col2', 'col3', 'col4', 'col5'];
    let csv = columnTitles.join(',') + '\n';
    data.forEach(item => {
      csv += columnTitles.map(col => item[col]).join(',') + '\n';
    });
    return csv;
  }
}

