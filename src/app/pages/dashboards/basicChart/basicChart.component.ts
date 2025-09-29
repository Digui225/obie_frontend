import { Component } from '@angular/core';


@Component({
  selector: 'app-basicChart',
  templateUrl: './basicchart.component.html',
  styleUrls: ['./basicchart.component.scss']
})
export class BasicchartComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  basicChart: any;
  

  constructor() { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Apexcharts' },
      { label: 'Area Charts', active: true }
    ];

    // Chart Color Data Get Function
    this._basicChart('["--vz-danger", "--vz-primary", "--vz-success"]');

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
   private _basicChart(colors:any) {
    colors = this.getChartColorsArray(colors);
    this.basicChart = {
      series: [{
        name: "Net Profit",
        data: [46, 57, 59, 54, 62, 58, 64, 60, 66],
      },
      {
          name: "Revenue",
          data: [74, 83, 102, 97, 86, 106, 93, 114, 94],
      },
      {
          name: "Free Cash Flow",
          data: [37, 42, 38, 26, 47, 50, 54, 55, 43],
      },
      ],
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
            show: false,
        },
      },
      plotOptions: {
          bar: {
              horizontal: false,
              columnWidth: "45%",
          },
      },
      dataLabels: {
          enabled: false,
      },
      stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
      },
      colors: colors,
      xaxis: {
          categories: [
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
          ],
      },
      yaxis: {
          title: {
              text: "$ (thousands)",
          },
      },
      grid: {
          borderColor: "#f1f1f1",
      },
      fill: {
          opacity: 1,
      },
      tooltip: {
          y: {
              formatter: function (val:any) {
                  return "$ " + val + " thousands";
              },
          },
      },
    };
    }
}
