import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';  // Pour l'exportation Excel
import { jsPDF } from 'jspdf';  // Pour l'exportation PDF
import 'jspdf-autotable';  // Pour utiliser autoTable dans jsPDF
import { FaitSuiviAbonneService } from 'src/app/core/services/fait-suivi-abonne.service';
import { ViewChild } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-horizontalbar-abonne',
  templateUrl: './horizontalbar-abonne.component.html',
  styleUrls: ['./horizontalbar-abonne.component.scss']
})
export class HorizontalbarAbonneComponent {
  constructor(private faitSuiviAbonneService: FaitSuiviAbonneService) { }

  @ViewChild('dropdownMenu', { static: false }) dropdown!: NgbDropdown;


  // bread crumb items
  breadCrumbItems!: Array<{}>;
  StackedHorizontalBarChart: any;
  // ✅ Champs liés à l'input date
  startDate: string = '2020-01-01';
  endDate: string = '2020-12-30';

  ngOnInit(): void {

    
    this.breadCrumbItems = [{ label: 'Charts' }, { label: 'E - Chart', active: true }];
    //this._StackedHorizontalBarChart('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]');

    
  
    this.loadChartData();

  }

  loadChartData(): void {
    if (!this.startDate || !this.endDate) {
      alert('Veuillez choisir une période valide');
      return;
    }
  
    this.faitSuiviAbonneService.getMultiAbonneInfos(this.startDate, this.endDate).subscribe({
      next: (data) => {
        this.processChartData(data);
      },
      error: (err) => {
        console.error('Erreur lors du chargement du graphique :', err);
      }
    });
  }
  

  

  processChartData(data: any[]): void {
    const moisLabels: string[] = [];
    const actifs: number[] = [];
    const inactifs: number[] = [];
  
    data.forEach(row => {
      moisLabels.push(row[0] || 'Inconnu');  // index 0 = mois
      actifs.push(row[1] || 0);              // index 1 = actifs
      inactifs.push(row[2] || 0);            // index 2 = inactifs
    });
  
    this._StackedHorizontalBarChart(
      '["--vz-primary", "--vz-warning", "--vz-danger"]',
      moisLabels,
      actifs,
      inactifs,
    );
  }
  
  

  private _StackedHorizontalBarChart(
    colors: any,
    moisLabels: string[],
    actifs: number[],
    inactifs: number[],
  ) {
    colors = this.getChartColorsArray(colors);
  
    this.StackedHorizontalBarChart = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      legend: {
        textStyle: { color: '#858d98' }
      },
      grid: {
        left: '1%',
        right: '3%',
        bottom: '0%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        axisLine: { lineStyle: { color: '#858d98' } },
        splitLine: { lineStyle: { color: 'rgba(133, 141, 152, 0.1)' } }
      },
      color: colors,
      yAxis: {
        type: 'category',
        data: moisLabels,
        axisLine: { lineStyle: { color: '#858d98' } },
        splitLine: { lineStyle: { color: 'rgba(133, 141, 152, 0.1)' } }
      },
      textStyle: { fontFamily: 'Poppins, sans-serif' },
      series: [
        {
          name: 'Actifs',
          type: 'bar',
          stack: 'total',
          label: { show: true },
          emphasis: { focus: 'series' },
          data: actifs
        },
        {
          name: 'Inactifs',
          type: 'bar',
          stack: 'total',
          label: { show: true },
          emphasis: { focus: 'series' },
          data: inactifs
        },
      ]
    };
  }
  

  // Chart Colors Set
  private getChartColorsArray(colors: any) {
    colors = JSON.parse(colors);
    return colors.map(function (value: any) {
      var newValue = value.replace(" ", "");
      if (newValue.indexOf(",") === -1) {
        var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
        if (color) {
          color = color.replace(" ", "");
          return color;
        } else return newValue;
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
  

  // Méthode pour récupérer les données du graphique sous un format adapté
  private getChartData(): any[] {
    const categories = this.StackedHorizontalBarChart?.yAxis?.data || [];
    const series = this.StackedHorizontalBarChart?.series || [];
  
    const result: any[] = [];
    categories.forEach((category: string, index: number) => {
      const row: any = { Mois: category };
      series.forEach((serie: any) => {
        row[serie.name] = serie.data[index];
      });
      result.push(row);
    });
  
    return result;
  }
  

  

  // Exporter en Excel
  exportToExcel(): void {
    const data = this.getChartData();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);  // Convertir les données en feuille Excel
    const wb: XLSX.WorkBook = { Sheets: { 'Sheet1': ws }, SheetNames: ['Sheet1'] };  // Créer un classeur
    XLSX.writeFile(wb, 'repartition_abonnes.xlsx');  // Exporter le fichier Excel
  }

  exportToPDF(): void {
    const reader = new FileReader();
    const imagePath = 'assets/images/gs2e_logo.jpg';
  
    fetch(imagePath)
      .then(res => res.blob())
      .then(blob => {
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const logoData = reader.result as string;
          this.generatePDFWithLogo(logoData); // Appelle une méthode séparée
        };
      });
  }
  
  generatePDFWithLogo(logoData: string): void {
    const doc = new jsPDF();
  
    doc.addImage(logoData, 'PNG', 10, 10, 40, 15);
  
    const pageWidth = doc.internal.pageSize.getWidth();
    const title = 'REPARTITION DES ABONNES PAR STATUT';
    const textWidth = doc.getTextWidth(title);
    const xCentered = (pageWidth - textWidth) / 2;
  
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(title, xCentered, 40);
  
    const data = this.getChartData();
    const headers = Object.keys(data[0]);
    const rows = data.map(row => Object.values(row));
  
    (doc as any).autoTable({
      head: [headers],
      body: rows,
      startY: 50,
      theme: 'grid',
      headStyles: {
        fillColor: [26, 189, 156],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      styles: {
        font: 'helvetica',
        fontSize: 10,
        cellPadding: 3
      }
    });

    // 🕒 Date et heure d'export
    const now = new Date();
    const formattedDate = now.toLocaleDateString();   // Format local, ex : 24/07/2025
    const formattedTime = now.toLocaleTimeString();   // Ex : 11:45:00
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Exporté le ${formattedDate} à ${formattedTime}`, 10, 285); // bas gauche
  
    doc.save('repartition_abonnes.pdf');
  }
  
  

  
  

  downloadChartImageUsingHtml2Canvas(): void {
    // 🔒 Fermer le menu déroulant avant de capturer l'image
    this.dropdown.close();

    setTimeout(() => {
      const chartElement = document.getElementById('chart_hor_bar');
      if (chartElement) {
        html2canvas(chartElement).then((canvas) => {
          const image = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = image;
          link.download = 'repartition_statut_abonnes.png';
          link.click();
        });
      } else {
        console.error('Élément de graphique non trouvé');
      }
    }, 200); // petit délai pour que le dropdown se ferme
  }
  }
  

  /* downloadChartImageUsingHtml2Canvas(): void {
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
  } */

  /* // StackedHorizontalBarChart
  private _StackedHorizontalBarChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.StackedHorizontalBarChart = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      legend: {
        textStyle: { color: '#858d98' }
      },
      grid: {
        left: '1%',
        right: '3%',
        bottom: '0%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        axisLine: { lineStyle: { color: '#858d98' } },
        splitLine: { lineStyle: { color: 'rgba(133, 141, 152, 0.1)' } }
      },
      color: colors,
      yAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLine: { lineStyle: { color: '#858d98' } },
        splitLine: { lineStyle: { color: 'rgba(133, 141, 152, 0.1)' } }
      },
      textStyle: { fontFamily: 'Poppins, sans-serif' },
      series: [
        { name: 'Suspenudus', type: 'bar', stack: 'total', label: { show: true }, emphasis: { focus: 'series' }, data: [320, 302, 301, 334, 390, 330, 320] },
        { name: 'Migrés', type: 'bar', stack: 'total', label: { show: true }, emphasis: { focus: 'series' }, data: [120, 132, 101, 134, 90, 230, 210] },
        { name: 'Inactifs', type: 'bar', stack: 'total', label: { show: true }, emphasis: { focus: 'series' }, data: [220, 182, 191, 234, 290, 330, 310] },
        { name: 'Résiliés', type: 'bar', stack: 'total', label: { show: true }, emphasis: { focus: 'series' }, data: [150, 212, 201, 154, 190, 330, 410] },
        { name: 'Actifs', type: 'bar', stack: 'total', label: { show: true }, emphasis: { focus: 'series' }, data: [820, 832, 901, 934, 1290, 1330, 1320] }
      ]
    };
  }
 */