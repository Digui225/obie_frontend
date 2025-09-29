import { Component } from '@angular/core';

@Component({
  selector: 'app-multiple-yaxis-abonne',
  templateUrl: './multiple-yaxis-abonne.component.html',
  styleUrls: ['./multiple-yaxis-abonne.component.scss']
})
export class MultipleYaxisAbonneComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  multipleYAxisChart: any;


  constructor() { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Apexcharts' },
      { label: 'Mixed Charts', active: true }
    ];

    // Chart Color Data Get Function
    this._multipleYAxisChart('["--vz-primary", "--vz-info", "--vz-success"]');
  
  }

  // Chart Colors Set
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
 * Multiple Y-Axis Charts
 */
  private _multipleYAxisChart(colors:any) {
    colors = this.getChartColorsArray(colors);
    this.multipleYAxisChart = {
      series: [{
        name: 'Domestique Social',
        type: 'column',
        data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
    }, {
        name: 'Domestique General',
        type: 'column',
        data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
    }, {
        name: 'Pro General',
        type: 'line',
        data: [20, 29, 37, 36, 44, 45, 50, 58]
      }],
      chart: {
          height: 385,
          type: 'line',
          stacked: false,
          toolbar: {
              show: false,
          }
      },
      dataLabels: {
          enabled: false
      },
      stroke: {
          width: [1, 1, 4]
      },
      title: {
          text: 'XYZ - Stock Analysis (2009 - 2016)',
          align: 'left',
          offsetX: 110,
          style: {
              fontWeight: 600,
          },
      },
      xaxis: {
          categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
      },
      yaxis: [{
              axisTicks: {
                  show: true,
              },
              axisBorder: {
                  show: true,
                  color: '#405189'
              },
              labels: {
                  style: {
                      colors: '#405189',
                  }
              },
              title: {
                  text: "Domestique Social (thousand crores)",
                  style: {
                      color: '#405189',
                      fontWeight: 600
                  }
              },
              tooltip: {
                  enabled: true
              }
          },
          {
              seriesName: 'Domestique Social',
              opposite: true,
              axisTicks: {
                  show: true,
              },
              axisBorder: {
                  show: true,
                  color: '#405189'
              },
              labels: {
                  style: {
                      colors: '#405189',
                  }
              },
              title: {
                  text: "Domestique General (thousand crores)",
                  style: {
                      color: '#405189',
                      fontWeight: 600
                  }
              },
          },
          {
              seriesName: 'Pro General',
              opposite: true,
              axisTicks: {
                  show: true,
              },
              axisBorder: {
                  show: true,
                  color: '#63ad6f'
              },
              labels: {
                  style: {
                      colors: '#63ad6f',
                  },
              },
              title: {
                  text: "Pro General (thousand crores)",
                  style: {
                      color: '#63ad6f',
                      fontWeight: 600
                  }
              }
          },
      ],
      tooltip: {
          fixed: {
              enabled: true,
              position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
              offsetY: 30,
              offsetX: 60
          },
      },
      legend: {
          horizontalAlign: 'left',
          offsetX: 40
      },
      colors: colors
    };
  }

}
