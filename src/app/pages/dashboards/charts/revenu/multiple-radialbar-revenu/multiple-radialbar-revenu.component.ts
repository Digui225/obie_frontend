import { Component } from '@angular/core';

@Component({
  selector: 'app-multiple-radialbar-revenu',
  templateUrl: './multiple-radialbar-revenu.component.html',
  styleUrls: ['./multiple-radialbar-revenu.component.scss']
})
export class MultipleRadialbarRevenuComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  multipleRadialbarChart: any;
  
  constructor() { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Apexcharts' },
      { label: 'Radialbar Charts', active: true }
    ];

    // Chart Color Data Get Function
    this._multipleRadialbarChart('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger"]');
   
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
 * Multiple Radialbar
 */
private _multipleRadialbarChart(colors:any) {
  colors = this.getChartColorsArray(colors);
  this.multipleRadialbarChart = {
    series: [44, 55, 67, 83],
    chart: {
        height: 400,
        type: "radialBar",
    },
    plotOptions: {
        radialBar: {
            dataLabels: {
                name: {
                    fontSize: "22px",
                },
                value: {
                    fontSize: "16px",
                },
                total: {
                    show: true,
                    label: "Total",
                },
            },
        },
    },
    labels: ["Redevance encaissée","Avance sur consommation encaissée", "Droit de timbre encaissé", "Ventes Accessoires"],
    colors: colors,
  };
}
}
