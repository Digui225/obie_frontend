import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horizontalbar',
  templateUrl: './horizontalbar.component.html',
  styleUrls: ['./horizontalbar.component.scss']
})
export class HorizontalbarComponent implements OnInit{

  constructor() { }

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  StackedHorizontalBarChart:any;
  
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Charts' }, { label: 'E - Chart', active: true }];

    // Chart Color Data Get Function
    this._StackedHorizontalBarChart('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]');
    
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

    // StackedHorizontalBarChart
    private _StackedHorizontalBarChart(colors:any) {
      colors = this.getChartColorsArray(colors);
      this.StackedHorizontalBarChart = {
          tooltip: {
          trigger: 'axis',
          axisPointer: {
              // Use axis to trigger tooltip
              type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          }
      },
      legend: {
          textStyle: { //The style of the legend text
              color: '#858d98',
          },
      },
      grid: {
          left: '1%',
          right: '3%',
          bottom: '0%',
          containLabel: true
      },
      xAxis: {
          type: 'value',
          axisLine: {
              lineStyle: {
                  color: '#858d98'
              },
          },
          splitLine: {
              lineStyle: {
                  color: "rgba(133, 141, 152, 0.1)"
              }
          }
      },
      color: colors,
      yAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisLine: {
              lineStyle: {
                  color: '#858d98'
              },
          },
          splitLine: {
              lineStyle: {
                  color: "rgba(133, 141, 152, 0.1)"
              }
          }
      },
      textStyle: {
          fontFamily: 'Poppins, sans-serif'
      },
      series: [{
              name: 'Direct',
              type: 'bar',
              stack: 'total',
              label: {
                  show: true
              },
              emphasis: {
                  focus: 'series'
              },
              data: [320, 302, 301, 334, 390, 330, 320]
          },
          {
              name: 'Mail Ad',
              type: 'bar',
              stack: 'total',
              label: {
                  show: true
              },
              emphasis: {
                  focus: 'series'
              },
              data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
              name: 'Affiliate Ad',
              type: 'bar',
              stack: 'total',
              label: {
                  show: true
              },
              emphasis: {
                  focus: 'series'
              },
              data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
              name: 'Video Ad',
              type: 'bar',
              stack: 'total',
              label: {
                  show: true
              },
              emphasis: {
                  focus: 'series'
              },
              data: [150, 212, 201, 154, 190, 330, 410]
          },
          {
              name: 'Search Engine',
              type: 'bar',
              stack: 'total',
              label: {
                  show: true
              },
              emphasis: {
                  focus: 'series'
              },
              data: [820, 832, 901, 934, 1290, 1330, 1320]
          }
          ]
      };
  }
}
