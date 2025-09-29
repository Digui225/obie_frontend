import { Component } from '@angular/core';

@Component({
  selector: 'app-basicbarchart',
  templateUrl: './BasicBarChart.component.html',
  styleUrls: ['./BasicBarChart.component.scss']
})
export class BarchartComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  BasicBarChart:any;

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Charts' }, { label: 'E - Chart', active: true }];

    // Chart Color Data Get Function
    
    this._BasicBarChart('["--vz-success"]');
  
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

    // BasicBarChart
    private _BasicBarChart(colors:any) {
      colors = this.getChartColorsArray(colors);
      this.BasicBarChart = {
          grid: {
          left: '0%',
          right: '0%',
          bottom: '0%',
          top: '3%',
          containLabel: true
          },
          xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              axisLine: {
                  lineStyle: {
                      color: '#858d98'
                  },
              },
          },
          yAxis: {
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
          textStyle: {
              fontFamily: 'Poppins, sans-serif'
          },
          color: colors,
          series: [{
              data: [120, 200, 150, 80, 70, 110, 130],
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                  color: 'rgba(180, 180, 180, 0.2)'
              }
          }]
      };
  }
}
