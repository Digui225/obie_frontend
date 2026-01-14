import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';  // Pour gérer les téléchargements
import * as XLSX from 'xlsx';  // Pour l'export Excel
import { jsPDF } from 'jspdf';  // Pour l'export PDF
import 'jspdf-autotable';  // Pour utiliser autoTable dans jsPDF
import { FaitSuiviEnergieService } from 'src/app/core/services/fait-suivi-energie.service';

@Component({
  selector: 'app-combochart-energie',
  templateUrl: './combochart-energie.component.html',
  styleUrls: ['./combochart-energie.component.scss']
})
export class CombochartEnergieComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  comboChart: any;
  // ✅ Champs liés à l'input date
  startDate: string | number = '20230101';
  endDate: string | number = '20231230';
  

  constructor(private faitSuiviEnergieService: FaitSuiviEnergieService) { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Apexcharts' },
      { label: 'Area Charts', active: true }
    ];

    // 🔁 Charger les données avec la période par défaut
    this.loadChartData();


    // Chart Color Data Get Function
    //this._comboChart('["--vz-danger", "--vz-primary", "--vz-success"]');

  }

  // ✅ Nouvelle méthode dynamique
  loadChartData(): void {
    if (!this.startDate || !this.endDate) {
      alert("Veuillez choisir une période valide.");
      return;
    }

    this.faitSuiviEnergieService.getQuantiteKwhInfos(this.startDate.toString(), this.endDate.toString())
      .subscribe({
        next: (data) => this.processTypeChartData(data),
        error: (err) => {
          console.error("Erreur lors du chargement des données énergie :", err);
        }
      });
  }

  private getChartColorsArray(colors:any) {
    colors = JSON.parse(colors);
    return colors.map(function (value:any) {
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
 * Basic Column Charts
 */
   processTypeChartData(data: any[]): void {
    const moisLabels: string[] = [];
    const quantiteProd: number[] = [];
    const quantiteFact: number[] = [];
    const quantiteLiv: number[] = [];
  
    data.forEach(row => {
      moisLabels.push(row[0]);
      quantiteProd.push(row[1] || 0);
      quantiteFact.push(row[2] || 0);
      quantiteLiv.push(row[3] || 0);
    });
  
    this._comboChart(
      '["--vz-primary", "--vz-success", "--vz-warning"]',
      moisLabels,
      quantiteProd,
      quantiteFact,
      quantiteLiv
    );
  }

  /**
 * Configuration du Combo Chart (Barres + Ligne)
 */
/**
 * Configuration du Line Chart multi-séries
 */
private _comboChart(
  colors: any,
  categories: string[],
  quantiteProd: number[],
  quantiteFact: number[],
  quantiteLiv: number[]
) {
  colors = this.getChartColorsArray(colors);

  this.comboChart = {
    series: [
      {
        name: "Quantité produite",
        data: quantiteProd,
      },
      {
        name: "Quantité facturée",
        data: quantiteFact,
      },
      {
        name: "Quantité livrée",
        data: quantiteLiv,
      },
    ],
    chart: {
      height: 400,
      type: "line",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: true,
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 4,
    },
    colors: colors,
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: categories,
      title: {
        text: "Mois",
      },
    },
    yaxis: {
      title: {
        text: "Quantité Kwh",
      },
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    tooltip: {
      y: {
        formatter: function (val: any) {
          return val + " Kwh";
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
  };
}

  /* private _comboChart(
    colors: any,
    categories: string[],
    quantiteProd: number[],
    quantiteFact: number[],
    quantiteLiv: number[]
  ) {
    colors = this.getChartColorsArray(colors);
  
    this.comboChart = {
      series: [
        {
          name: "Quantité produite",
          type: "column",
          data: quantiteProd,
        },
        {
          name: "Quantité facturée",
          type: "column",
          data: quantiteFact,
        },
        {
          name: "Quantité livrée",
          type: "line",
          data: quantiteLiv,
        },
      ],
      chart: {
        height: 400,
        type: "line",
        stacked: false,
        toolbar: {
          show: false,
        },
      },
      stroke: {
        width: [0, 0, 3],
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          columnWidth: "45%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: colors,
      xaxis: {
        categories: categories,
        title: {
          text: "Mois",
        },
      },
      yaxis: [
        {
          title: {
            text: "Quantité Kwh (Produite/Facturée)",
          },
        },
        {
          opposite: true,  // 👉 axe à droite
          title: {
            text: "Quantité Kwh Livrée",
          },
        },
      ],
      grid: {
        borderColor: "#f1f1f1",
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (val: any) {
            return val + " Kwh";
          },
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
      },
    };
  } */
  


    /**
   * Exporter les données en PDF
   */
  exportToPDF(): void {
    const doc = new jsPDF();
  
    const title = 'REPARTITION MENSUELLE DE LA PRODUCTION D ENERGIE';
    const fileName = 'repartition_energie.pdf';
    const logoUrl = 'assets/images/gs2e_logo.jpg';
  
    const reader = new FileReader();
  
    fetch(logoUrl)
      .then(res => res.blob())
      .then(blob => {
        reader.readAsDataURL(blob);
        reader.onload = () => {
          const logoData = reader.result as string;
  
          // 🖼️ Ajout du logo
          doc.addImage(logoData, 'PNG', 10, 10, 30, 15); // x, y, width, height
  
          // 🖋️ Titre centré
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(16);
          const pageWidth = doc.internal.pageSize.getWidth();
          const titleWidth = doc.getTextWidth(title);
          const titleX = (pageWidth - titleWidth) / 2;
          doc.text(title, titleX, 40);
  
          // 📄 Données du tableau
          const headers = ['Mois', 'Quantité consommée', 'Quantité Facturée', 'Quantité livrée'];
          const data = this.comboChart.xaxis.categories.map((category: string, index: number) => [
            category,
            this.comboChart.series[0].data[index],
            this.comboChart.series[1].data[index],
            this.comboChart.series[2].data[index]
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
              halign: 'center'
            }
          });
  
          // 🕒 Footer date/heure
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
        console.error("Erreur lors du chargement du logo :", err);
      });
  }
  
  

  /**
   * Exporter les données en Excel
   */
  exportToExcel(): void {
    const ws = XLSX.utils.aoa_to_sheet([
      ['Mois', 'Quantité consommée', 'Quantité Facturée', 'Quantité livrée'],
      ...this.comboChart.xaxis.categories.map((category: string, index: number) => [
        category,
        this.comboChart.series[0].data[index],
        this.comboChart.series[1].data[index],
        this.comboChart.series[2].data[index]
      ])
    ]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Repartition');
    XLSX.writeFile(wb, 'repartition_energie.xlsx');
  }

  downloadChartImageUsingHtml2Canvas(): void {
    const chartElement = document.getElementById('chart_basic'); // Cibler l'élément du graphique
  
    if (chartElement) {
      // Utiliser html2canvas pour capturer une image de l'élément
      html2canvas(chartElement).then((canvas) => {
        // Convertir le canvas en image (base64 PNG)
        const image = canvas.toDataURL('image/png');
  
        // Créer un lien pour télécharger l'image
        const link = document.createElement('a');
        link.href = image;  // Lien vers l'image
        link.download = 'repartition_energie_graphique.png';  // Nom du fichier à télécharger
        link.click();  // Simuler un clic pour télécharger l'image
      });
    } else {
      console.error('Élément de graphique non trouvé');
    }
  }

}
