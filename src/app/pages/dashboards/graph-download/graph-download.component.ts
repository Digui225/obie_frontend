import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-graph-download',
  templateUrl: './graph-download.component.html',
  styleUrls: ['./graph-download.component.scss']
})
export class GraphDownloadComponent {

  @ViewChild('pieChart') pieChartElement: ElementRef | undefined;

  showModal: boolean = false;  // To show or hide the modal

  // Data for the pie chart
  chartData = {
    labels: ['Abidjan', 'Ouest', 'Est', 'Nord'],
    datasets: [{
      data: [55, 20, 15, 10],
      backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
      hoverBackgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56']
    }]
  };

  chartOptions = {
    responsive: true,
    onClick: (event: any, chartElement: any) => {
      const activePoints = chartElement[0];
      if (activePoints) {
        const label = this.chartData.labels[activePoints.index];
        if (label === 'Abidjan') {
          this.showModal = true;  // Show modal with details when Abidjan is clicked
        }
      }
    }
  };

  chart: any;

  ngOnInit(): void {
    Chart.register(...registerables); // Register all chart types

    this.chart = new Chart(this.pieChartElement?.nativeElement, {
      type: 'pie',
      data: this.chartData,
      options: this.chartOptions
    });
  }

  // Close modal
  closeModal(): void {
    this.showModal = false;
  }

  // Download chart image
  downloadChartImage(): void {
    const image = this.chart.toBase64Image();  // Get image in base64 format
    const link = document.createElement('a');
    link.href = image;
    link.download = 'chart.png';  // Download with the name "chart.png"
    link.click();
  }

}
