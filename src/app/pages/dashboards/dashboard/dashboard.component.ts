import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ToastService } from './toast-service';
import { HttpClient } from '@angular/common/http';

import { circle, latLng, tileLayer } from 'leaflet';
import { SwiperOptions } from 'swiper/types/swiper-options';

import { TotalDomaineService } from 'src/app/core/services/total-par-domaine.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DateRangeService } from'src/app/core/services/date-range.service';
import { DataSharingService } from 'src/app/core/services/data-sharing.service';

import { BestSelling, TopSelling, RecentSelling, statData } from './data';
import { ChartType } from './dashboard.model';
import { DonutChartComponent } from '../charts/dashboard/donut-chart/donut-chart.component';

import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

/**
 * Ecommerce Component
 */
export class DashboardComponent implements OnInit {

  
  @Output() regionSelected = new EventEmitter<string>(); // Événement pour notifier la sélection d'une région


  // bread crumb items
  username: string = 'Utilisateur';
  breadCrumbItems!: Array<{}>;
  analyticsChart!: ChartType;
  BestSelling: any;
  TopSelling: any;
  RecentSelling: any;
  SalesCategoryChart!: ChartType;
  statData!: any;
  currentDate: any;
  results: [string, number][] = [];  // Stocker les résultats de l'API
  simplePieChart: any;  // Configuration du graphique
  showCard : boolean = false;

  startDate: string = '2023-01-01';
  endDate: string = '2023-12-31';

  // Current Date
  // currentDate: Date = new Date();

  constructor(public toastService: ToastService, 
    private http: HttpClient,
    private totaldomaineService : TotalDomaineService,

    public dateRangeService: DateRangeService,
    public authService: AuthenticationService ) {
    var dt = new Date();
    dt.setDate(dt.getDate() + 15);
    this.currentDate = { from: new Date(), to: dt }
  }

 

      ngOnInit(): void {

    
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Accueil' },
      { label: 'Accueil', active: true }
    ];

    // Toast connexion
      if (localStorage.getItem('toast')) {
        this.toastService.show('Connexion réussie.', {
          classname: 'bg-success text-center text-white',
          delay: 5000
        });
        localStorage.removeItem('toast');
      }

      this.authService.getCurrentUser().subscribe({
        next: (res) => console.log('✅ Utilisateur connecté :', res),
        error: (err) => console.error('❌ Erreur backend :', err)
      });

       this.authService.isLoggedIn().then(isLogged => {
        if (isLogged) {
          this.authService.loadUsernameFromKeycloak().then(username => {
            this.username = username ?? 'Utilisateur';
          }).catch(err => {
            console.error('Erreur lors du chargement du profil :', err);
            this.username = 'Utilisateur';
          });
        } else {
          console.warn('Utilisateur non connecté');
          this.username = 'Utilisateur';

        }
      }); 
  

      // Récupération synchrone du username Keycloak
      /* try {
        const keycloakInstance = this.authService.getKeycloakInstance();
        const tokenParsed = keycloakInstance.tokenParsed;
        this.username = tokenParsed?.['preferred_username'] ?? 'Erreur';
        console.log('Nom d’utilisateur chargé :', this.username);
      } catch (err) {
        console.error('Erreur lors du chargement du username :', err);
        this.username = 'Utilisateur';
      } */


    this.fetchStats();
    this.fetchStatsEnergie();
    this.fetchStatsRevenu();
    this.fetchStatsSoll();

    /**
    * Fetches the data
    */
    this.fetchData();

    // Chart Color Data Get Function
    this._analyticsChart('["--vz-primary", "--vz-success", "--vz-danger"]');
    this._SalesCategoryChart('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]');
  } 

  fetchStats(): void {
    /*  const start = '2020-01-01';
    const end = '2020-12-30';  */
  
    this.totaldomaineService.getTotalAbonne(this.startDate, this.endDate).subscribe({
      next: (data: number) => {  
        console.log('Nombre total d\'abonnés reçu :', data);
        this.statData[0].value = data.toLocaleString('fr-FR');  
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des statistiques', error);
        this.statData[0].value = 'Erreur';
      }
    });

  } 

  fetchStatsEnergie(): void {
    /*  const start = '2018-01-01';
    const end = '2025-12-31';  */

    this.totaldomaineService.getTotalKwh(this.startDate, this.endDate).subscribe({
      next: (data: number) => {  
        console.log('Nombre total de Qwh reçu :', data);
        this.statData[1].value = data.toLocaleString('fr-FR') +' Kwh';  
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des statistiques', error);
        this.statData[1].value = 'Erreur';
      }
    });
  } 

   fetchStatsRevenu(): void {
    /*  const start = '2018-01-01';
    const end = '2025-12-31';  */

    this.totaldomaineService.getTotalRevenu(this.startDate, this.endDate).subscribe({
      next: (data: number) => {  
        console.log('Montant total reçu :', data);
        this.statData[2].value = data.toLocaleString('fr-FR') +' Fcfa';  
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des statistiques', error);
        this.statData[2].value = 'Erreur';
      }
    });
  }

  fetchStatsSoll(): void {
    /*  const start = '2018-01-01';
    const end = '2025-12-31';  */

    this.totaldomaineService.getTotalSoll(this.startDate, this.endDate).subscribe({
      next: (data: number) => {  
        console.log('Sollicitation total reçu :', data);
        this.statData[3].value = data.toLocaleString('fr-FR') ;  
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des statistiques', error);
        this.statData[3].value = 'Erreur';
      }
    });
  }

  /* fetchStatsEnergie(): void {
    this.http.get<number>('http://192.168.10.181:9080/api/v1/FaitSuiviEnergie/QuantiteKwhProduit?start=2020-01-01&end=2020-03-30')
      .subscribe({
        next: data => {
          console.log('Qwh reçu :', data);
          this.statData[2].value = data;
        },
        error: err => {
          console.error('❌ Erreur brute HTTP :', err);
          this.statData[2].value = 'Erreur';
        }
      });
  } */

   
  



  //Telechargement rapport
  

 // Méthodes pour exporter les données (comme dans ton code d'origine)
 exportToCSV(): void {
  const csvData = this.convertToCSV();
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, 'repartition_abonnes.csv');
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



private convertToCSV(): string {
  const header = ['Direction', 'Abonnés'];
  const rows = this.SalesCategoryChart.labels.map((label: string, index: number) => {
    return [label, this.SalesCategoryChart.series[index]].join(',');
  });
  return [header.join(','), ...rows].join('\n');
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

onRegionClicked(region: string) {
  console.log("Région sélectionnée :", region);
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

  /**
 * Sales Analytics Chart
 */
  setrevenuevalue(value: any) {
    if (value == 'all') {
      this.analyticsChart.series = [{
        name: 'Orders',
        type: 'area',
        data: [34, 65, 46, 68, 49, 61, 42, 44, 78, 52, 63, 67]
      }, {
        name: 'Earnings',
        type: 'bar',
        data: [89.25, 98.58, 68.74, 108.87, 77.54, 84.03, 51.24, 28.57, 92.57, 42.36, 88.51, 36.57]
      }, {
        name: 'Refunds',
        type: 'line',
        data: [8, 12, 7, 17, 21, 11, 5, 9, 7, 29, 12, 35]
      }]
    }
    if (value == '1M') {
      this.analyticsChart.series = [{
        name: 'PRODUCTION',
        type: 'area',
        data: [24, 75, 16, 98, 19, 41, 52, 34, 28, 52, 63, 67]
      }, {
        name: 'BENEFICES',
        type: 'bar',
        data: [99.25, 28.58, 98.74, 12.87, 107.54, 94.03, 11.24, 48.57, 22.57, 42.36, 88.51, 36.57]
      }, {
        name: 'REMBOURSEMENTS',
        type: 'line',
        data: [28, 22, 17, 27, 21, 11, 5, 9, 17, 29, 12, 15]
      }]
    }
    if (value == '6M') {
      this.analyticsChart.series = [{
        name: 'PRODUCTION',
        type: 'area',
        data: [34, 75, 66, 78, 29, 41, 32, 44, 58, 52, 43, 77]
      }, {
        name: 'BENEFICES',
        type: 'bar',
        data: [109.25, 48.58, 38.74, 57.87, 77.54, 84.03, 31.24, 18.57, 92.57, 42.36, 48.51, 56.57]
      }, {
        name: 'REMBOURSEMENT',
        type: 'line',
        data: [12, 22, 17, 27, 1, 51, 5, 9, 7, 29, 12, 35]
      }]
    }
    if (value == '1Y') {
      this.analyticsChart.series = [{
        name: 'Orders',
        type: 'area',
        data: [34, 65, 46, 68, 49, 61, 42, 44, 78, 52, 63, 67]
      }, {
        name: 'Earnings',
        type: 'bar',
        data: [89.25, 98.58, 68.74, 108.87, 77.54, 84.03, 51.24, 28.57, 92.57, 42.36, 88.51, 36.57]
      }, {
        name: 'Refunds',
        type: 'line',
        data: [8, 12, 7, 17, 21, 11, 5, 9, 7, 29, 12, 35]
      }]
    }
  }

  private _analyticsChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.analyticsChart = {
      chart: {
        height: 370,
        type: "line",
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: "straight",
        dashArray: [0, 0, 8],
        width: [2, 0, 2.2],
      },
      colors: colors,
      series: [{
        name: 'PRODUCTION',
        type: 'area',
        data: [34, 65, 46, 68, 49, 61, 42, 44, 78, 52, 63, 67]
      }, {
        name: 'BENEFICES',
        type: 'bar',
        data: [89.25, 98.58, 68.74, 108.87, 77.54, 84.03, 51.24, 28.57, 92.57, 42.36,
          88.51, 36.57]
      }, {
        name: 'REMBOURSEMENT',
        type: 'line',
        data: [8, 12, 7, 17, 21, 11, 5, 9, 7, 29, 12, 35]
      }],
      fill: {
        opacity: [0.1, 0.9, 1],
      },
      labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003', '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'],
      markers: {
        size: [0, 0, 0],
        strokeWidth: 2,
        hover: {
          size: 4,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      grid: {
        show: true,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
        padding: {
          top: 0,
          right: -2,
          bottom: 15,
          left: 10,
        },
      },
      legend: {
        show: true,
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: -5,
        markers: {
          width: 9,
          height: 9,
          radius: 6,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 0,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "30%",
          barHeight: "70%",
        },
      },
    };
  }

  //ANALYTICS CHART DOWNLOAD
      // Télécharger les données en CSV
  downloadCSV() {
    const data = this.analyticsChart.series.map(series => series.data);
    const labels = this.analyticsChart.labels;
    const rows = labels.map((label, index) => {
      return [label, ...data.map(series => series[index])];
    });

    rows.unshift(['Date', ...this.analyticsChart.series.map(series => series.name)]);

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(rows);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Données Graphique');
    XLSX.writeFile(wb, 'graphique_donnees.csv');
  }

      // Méthode pour télécharger en PDF avec autoTable
  downloadPDF() {
    const doc = new jsPDF();
    
    const data = this.analyticsChart.series.map(series => series.data);
    const labels = this.analyticsChart.labels;

    // Préparer les données sous forme de tableau
    const rows = labels.map((label, index) => {
      return [label, ...data.map(series => series[index])];
    });

    // Ajouter l'entête (header) avec les noms des séries
    const headers = ['Date', ...this.analyticsChart.series.map(series => series.name)];

    // Utiliser autoTable pour générer le tableau dans le PDF
    (doc as any).autoTable({
      head: [headers],  // entêtes du tableau
      body: rows,      // lignes de données
      startY: 40,      // début du tableau à partir de Y = 40
    });

    // Sauvegarder le PDF
    doc.save('graphique_donnees.pdf');
  }

  // Télécharger les données en Excel
  downloadExcel() {
    const data = this.analyticsChart.series.map(series => series.data);
    const labels = this.analyticsChart.labels;
    const rows = labels.map((label, index) => {
      return [label, ...data.map(series => series[index])];
    });

    rows.unshift(['Date', ...this.analyticsChart.series.map(series => series.name)]);

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(rows);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Données Graphique');
    XLSX.writeFile(wb, 'graphique_donnees.xlsx');
  }

  //FIN DOWNLOAD ANALYTICS CHART

  /**
 *  Sales Category
 
  private fetchPieChartData(): void {
    const start = '2024-02-01';  // Remplace par une date dynamique si nécessaire
    const end = '2024-02-27';

    this.faitSuiviAbonneService.getTotalDir(start, end).subscribe({
      next: (data) => {
        console.log('Données reçues pour le graphe:', data);
        this.results = data;
        this._SalesCategoryChart('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]');
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données pour le graphe', error);
      }
    });
  }

  private _SalesCategoryChart(colors: any): void {
    colors = this.getChartColorsArray(colors);

    if (this.results.length === 0) return;

    const labels = this.results.map(item => item[0]); // Récupérer les noms des directions
    const series = this.results.map(item => item[1]); // Récupérer le nombre total d'abonnés par direction

    this.SalesCategoryChart = {
      series: series,
      labels: labels,
      chart: {
        height: 333,
        type: "donut",
        events: {
          dataPointSelection: (event: any, chartContext: any, config: any) => {
            this.onRegionSelected(labels[config.dataPointIndex]); // Sélectionner la région
          },
        },
        toolbar: {
          show: false,
        },
      },
      legend: {
        position: "bottom",
      },
      stroke: {
        show: false
      },
      dataLabels: {
        dropShadow: {
          enabled: false,
        },
      },
      colors: colors
    };
  }

  private getChartColorsArray(colors: string[]): string[] {
    return colors.map(color => getComputedStyle(document.documentElement).getPropertyValue(color).trim());
  }

  private onRegionSelected(region: string): void {
    console.log('Région sélectionnée:', region);
    // Ajoute ici le comportement souhaité quand une région est sélectionnée
  }
 */

  
  private _SalesCategoryChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.SalesCategoryChart = {
      series: [405556, 354477, 296110, 250000, 150000],
      labels: ["Abidjan", "Centre", "Nord", "Ouest", "Est"],
      chart: {
        height: 333,
        type: "donut",
        events: {
          dataPointSelection: (event: any, chartContext: any, config: any) => {
            const regions = ["Abidjan", "Centre", "Nord", "Ouest", "Est"];
            this.onRegionSelected(regions[config.dataPointIndex]); // Sélectionner la région et émettre
          },
        },
        toolbar: {
          show: false,
        },
      },
      legend: {
        position: "bottom",
      },
      stroke: {
        show: false
      },
      dataLabels: {
        dropShadow: {
          enabled: false,
        },
      },
      colors: colors
    };
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

  downloadChartImage(): void {
    const chartElement = document.getElementById('chart_accueil'); // Cibler l'élément du graphique
  
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

  /**
  * Fetches the data
  */
  private fetchData() {
    this.BestSelling = BestSelling;
    this.TopSelling = TopSelling;
    this.RecentSelling = RecentSelling;
    this.statData = statData;
  }








  /**
 * Swiper Vertical  
   */
  Vertical: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    direction: 'vertical',
    slidesPerView: 2,
    spaceBetween: 0,
    mousewheel: true,
  };

  /**
   * Recent Activity
   */
  toggleActivity() {
    const recentActivity = document.querySelector('.layout-rightside-col');
    if (recentActivity != null) {
      recentActivity.classList.toggle('d-none');
    }

    if (document.documentElement.clientWidth <= 767) {
      const recentActivity = document.querySelector('.layout-rightside-col');
      if (recentActivity != null) {
        recentActivity.classList.add('d-block');
        recentActivity.classList.remove('d-none');
      }
    }
  }

  /**
   * SidebarHide modal
   * @param content modal content
   */
  SidebarHide() {
    const recentActivity = document.querySelector('.layout-rightside-col');
    if (recentActivity != null) {
      recentActivity.classList.remove('d-block');
    }
  }

}
