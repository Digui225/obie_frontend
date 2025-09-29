import { Component, Input } from '@angular/core';
// Pour PDF et Image
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// Pour Excel
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-infos-abonne',
  templateUrl: './infos-abonne.component.html',
  styleUrls: ['./infos-abonne.component.scss']
})
export class InfosAbonneComponent {
  @Input() abonne: any; // Données de l’abonné injectées dynamiquement plus tard

  // Export PDF
  downloadPDF() {
    const element = document.querySelector('.card-abonne') as HTMLElement;
    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
      pdf.save('carte-abonne.pdf');
    });
  }

  // Export Image
  downloadImage() {
    const element = document.querySelector('.card-abonne') as HTMLElement;
    html2canvas(element).then(canvas => {
      const link = document.createElement('a');
      link.download = 'carte-abonne.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  }

  // Export Excel
  downloadExcel() {
    const data = [this.abonne];
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Abonné");
    XLSX.writeFile(wb, "carte-abonne.xlsx");
  }
}
