import { Component } from '@angular/core';

@Component({
  selector: 'app-column100-chart-abonne',
  templateUrl: './column100-chart-abonne.component.html',
  styleUrls: ['./column100-chart-abonne.component.scss']
})
export class Column100ChartAbonneComponent {

  breadCrumbItems!: Array<{}>;
  StackedColumn100Chart: any;

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Apexcharts' },
      { label: 'Area Charts', active: true }
    ];

      //   Chart Color Data Get Function
    
      this._StackedColumn100Chart('["--vz-primary", "--vz-success", "--vz-warning"]');
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
 * Stacked Column 100
 */
  private _StackedColumn100Chart(colors:any) {
    colors = this.getChartColorsArray(colors);
    this.StackedColumn100Chart = {
      series: [{
        name: "PRODUCT A",
        data: [44, 55, 41, 67, 22, 43, 21, 49],
        },
        {
            name: "PRODUCT B",
            data: [13, 23, 20, 8, 13, 27, 33, 12],
        },
        {
            name: "PRODUCT C",
            data: [11, 17, 15, 15, 21, 14, 15, 13],
        },
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        stackType: "100%",
        toolbar: {
            show: false,
        },
      },
      responsive: [{
          breakpoint: 480,
          options: {
              legend: {
                  position: "bottom",
                  offsetX: -10,
                  offsetY: 0,
              },
          },
      }, ],
      xaxis: {
          categories: [
              "2011 Q1",
              "2011 Q2",
              "2011 Q3",
              "2011 Q4",
              "2012 Q1",
              "2012 Q2",
              "2012 Q3",
              "2012 Q4",
          ],
      },
      fill: {
          opacity: 1,
      },
      legend: {
          position: "right",
          offsetX: 0,
          offsetY: 50,
      },
      colors: colors,
    };
  }

}
