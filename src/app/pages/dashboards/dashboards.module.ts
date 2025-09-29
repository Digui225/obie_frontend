import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';  // Import du MatTableModule
import { MatPaginatorModule } from '@angular/material/paginator';


import { CommonModule } from '@angular/common';
import {
  NgbToastModule
} from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { NgbPaginationModule, NgbModule, NgbTypeaheadModule, NgbDropdownModule, NgbNavModule, NgbTooltipModule, NgbDatepickerModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateRangeService } from 'src/app/core/services/date-range.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { DragDropModule } from '@angular/cdk/drag-drop';



// Feather Icon
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { CountToModule } from 'angular-count-to';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SimplebarAngularModule } from 'simplebar-angular';
// Apex Chart Package
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxEchartsModule } from 'ngx-echarts';


// Swiper Slider
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CalendarModule } from 'primeng/calendar';  // Import du module Calendar


// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';
// import flatpickr from 'flatpickr'; // Importation par défaut
// import { French } from 'flatpickr/dist/l10n/fr'; // Importer la langue française

// flatpickr.localize(French);  // Configurer la langue en français

//Module
import { DashboardsRoutingModule } from "./dashboards-routing.module";
import { SharedModule } from '../../shared/shared.module';
import { WidgetModule } from '../../shared/widget/widget.module';


// Component
import { AbonneComponent } from './abonne/abonne.component';
import { RevenuComponent } from './revenu/revenu.component';
import { EnergieComponent } from './energie/energie.component';
import { SollicitationComponent } from './sollicitation/sollicitation.component';
import { BarchartComponent } from './BasicBarChart/BasicBarChart.component';
// import { PiechartComponent } from './piechart/piechart.component';
import { MultipleradialbarComponent } from './multipleRadialbarChart/multipleRadialbarChart.component';
import { MultipleYAxisChartComponent } from './multiple-yaxis-chart/multiple-yaxis-chart.component';
import { AbonneService } from './abonne/abonne.service';
import { HorizontalbarComponent } from './horizontalbar/horizontalbar.component';
import { BasicChartAbonneComponent } from './charts/abonne/basic-chart-abonne/basic-chart-abonne.component';
import { BasicChartRevenuComponent } from './charts/revenu/basic-chart-revenu/basic-chart-revenu.component';
import { BasicchartComponent } from './basicChart/basicChart.component';
import { BasicBarRevenuComponent } from './charts/revenu/basic-bar-revenu/basic-bar-revenu.component';
import { BasicChartEnergieComponent } from './charts/energie/basic-chart-energie/basic-chart-energie.component';
import { BasicChartSollicitationComponent } from './charts/sollicitation/basic-chart-sollicitation/basic-chart-sollicitation.component';
import { BasicBarEnergieComponent } from './charts/energie/basic-bar-energie/basic-bar-energie.component';
import { BasicBarSollicitationComponent } from './charts/sollicitation/basic-bar-sollicitation/basic-bar-sollicitation.component';
import { PiechartAbonneComponent } from './charts/abonne/piechart-abonne/piechart-abonne.component';
import { PiechartEnergieComponent } from './charts/energie/piechart-energie/piechart-energie.component';
import { PiechartRevenuComponent } from './charts/revenu/piechart-revenu/piechart-revenu.component';
import { PiechartSollicitationComponent } from './charts/sollicitation/piechart-sollicitation/piechart-sollicitation.component';
import { MultipleRadialbarAbonneComponent } from './charts/abonne/multiple-radialbar-abonne/multiple-radialbar-abonne.component';
import { MultipleRadialbarEnergieComponent } from './charts/energie/multiple-radialbar-energie/multiple-radialbar-energie.component';
import { MultipleRadialbarRevenuComponent } from './charts/revenu/multiple-radialbar-revenu/multiple-radialbar-revenu.component';
import { MultipleRadialbarSollicitationComponent } from './charts/sollicitation/multiple-radialbar-sollicitation/multiple-radialbar-sollicitation.component';
import { HorizontalbarAbonneComponent } from './charts/abonne/horizontalbar-abonne/horizontalbar-abonne.component';
import { HorizontalbarEnergieComponent } from './charts/energie/horizontalbar-energie/horizontalbar-energie.component';
import { HorizontalbarRevenuComponent } from './charts/revenu/horizontalbar-revenu/horizontalbar-revenu.component';
import { HorizontalbarSollicitationComponent } from './charts/sollicitation/horizontalbar-sollicitation/horizontalbar-sollicitation.component';
import { MultipleYaxisAbonneComponent } from './charts/abonne/multiple-yaxis-abonne/multiple-yaxis-abonne.component';
import { MultipleYaxisEnergieComponent } from './charts/energie/multiple-yaxis-energie/multiple-yaxis-energie.component';
import { MultipleYaxisRevenuComponent } from './charts/revenu/multiple-yaxis-revenu/multiple-yaxis-revenu.component';
import { MultipleYaxisSollicitationComponent } from './charts/sollicitation/multiple-yaxis-sollicitation/multiple-yaxis-sollicitation.component';
import { AbonneListComponent } from './abonne-list/abonne-list.component';
import { ProduitListComponent } from './produit-list/produit-list.component';
import { DatatableComponent } from './tables/datatable/datatable.component';
import { Column100ChartComponent } from './column100-chart/column100-chart.component';
import { Column100ChartAbonneComponent } from './charts/abonne/column100-chart-abonne/column100-chart-abonne.component';
import { Column100ChartEnergieComponent } from './charts/energie/column100-chart-energie/column100-chart-energie.component';
import { Column100ChartRevenuComponent } from './charts/revenu/column100-chart-revenu/column100-chart-revenu.component';
import { DetailChartComponent } from './detail-chart/detail-chart.component';
import { GraphDownloadComponent } from './graph-download/graph-download.component';
import { FaitSuiviAbonneComponent } from './fait-suivi-abonne/fait-suivi-abonne.component';
import { DetailAbonneComponent } from './fait-suivi-abonne/detail-suivi-abonne/detail-abonne.component';
import { ApiTableConfigService } from 'src/app/core/services/api-table-config.service';
import { AfficherAbonneComponent } from './abonne/afficher-abonne/afficher-abonne.component';
import { StatsAbonneComponent } from './fait-suivi-abonne/stats-suivi-abonne/stats-abonne.component';
import { FaitSuiviRevenuComponent } from './revenu/fait-suivi-revenu/fait-suivi-revenu.component';
import { DetailRevenuComponent } from './revenu/fait-suivi-revenu/detail-revenu/detail-revenu.component';
import { StatsRevenuComponent } from './revenu/fait-suivi-revenu/stats-revenu/stats-revenu.component';
import { FaitSuiviEnergieComponent } from './energie/fait-suivi-energie/fait-suivi-energie.component';
import { StatsEnergieComponent } from './energie/stats-energie/stats-energie.component';
import { DetailEnergieComponent } from './energie/detail-energie/detail-energie.component';
import { FaitSuiviSollComponent } from './sollicitation/fait-suivi-soll/fait-suivi-soll.component';
import { DetailSollComponent } from './sollicitation/detail-soll/detail-soll.component';
import { StatsSollComponent } from './sollicitation/stats-soll/stats-soll.component';
import { DonutChartComponent } from './charts/dashboard/donut-chart/donut-chart.component';
import { CombochartEnergieComponent } from './charts/energie/combochart-energie/combochart-energie.component';
import { InfosAbonneComponent } from './fait-suivi-abonne/infos-abonne/infos-abonne.component';
import { StatsAllDomaineComponent } from './dashboard/stats-all-domaine/stats-all-domaine.component';
import { SelectIndicEnergieComponent } from './energie/select-indic-energie/select-indic-energie.component';
import { SelectIndicAbonneComponent } from './fait-suivi-abonne/select-indic-abonne/select-indic-abonne.component';
import { SelectPeriodeModalComponent } from './select-periode-modal/select-periode-modal.component';
import { DragDropEnergieComponent } from './energie/drag-drop-energie/drag-drop-energie.component';
import { DragDropAbonneComponent } from './fait-suivi-abonne/drag-drop-abonne/drag-drop-abonne.component';
import { ResultModalEnergieComponent } from './energie/result-modal-energie/result-modal-energie.component';
import { ResultModalAbonneComponent } from './fait-suivi-abonne/result-modal-abonne/result-modal-abonne.component';
import { SelectIndicRevenuComponent } from './revenu/fait-suivi-revenu/select-indic-revenu/select-indic-revenu.component';
import { DragDrogRevenuComponent } from './revenu/fait-suivi-revenu/drag-drog-revenu/drag-drog-revenu.component';
import { PiechartStackRevenuComponent } from './charts/revenu/piechart-stack-revenu/piechart-stack-revenu.component';
import { SelectIndicSollComponent } from './sollicitation/select-indic-soll/select-indic-soll.component';
import { DragDropSollComponent } from './sollicitation/drag-drop-soll/drag-drop-soll.component';
import { ResultModalSollComponent } from './sollicitation/result-modal-soll/result-modal-soll.component';
import { ResultModalRevenuComponent } from './revenu/fait-suivi-revenu/result-modal-revenu/result-modal-revenu.component';
import { PiechartStackSollComponent } from './charts/sollicitation/piechart-stack-soll/piechart-stack-soll.component';



@NgModule({
  declarations: [
    AbonneComponent,
    RevenuComponent,
    EnergieComponent,
    SollicitationComponent,

    // combo chart composants
    CombochartEnergieComponent,


    // Composants Basic Charts
    BasicChartAbonneComponent,
    BasicChartRevenuComponent,
    BasicChartEnergieComponent,
    BasicChartSollicitationComponent,

    //Composants Basic bar
    BasicBarRevenuComponent,
    BasicBarEnergieComponent,
    BasicBarSollicitationComponent,

    //Composants pie chart
    PiechartAbonneComponent,
    PiechartEnergieComponent,
    PiechartRevenuComponent,
    PiechartSollicitationComponent,

    //Composants multiple radialbar 
    MultipleRadialbarAbonneComponent,
    MultipleRadialbarEnergieComponent,
    MultipleRadialbarRevenuComponent,
    MultipleRadialbarSollicitationComponent,

    //Composants multiple yaxis
    MultipleYaxisAbonneComponent,
    MultipleYaxisEnergieComponent,
    MultipleYaxisRevenuComponent,
    MultipleYaxisSollicitationComponent,


    //Composants horizontal bar 
    HorizontalbarAbonneComponent,
    HorizontalbarEnergieComponent,
    HorizontalbarRevenuComponent,
    HorizontalbarSollicitationComponent,

    // composant graph de bases
    BarchartComponent,
    // PiechartComponent,
    MultipleradialbarComponent,
    MultipleYAxisChartComponent,
    HorizontalbarComponent,
    BasicchartComponent,
    AbonneListComponent,
    ProduitListComponent,
    DatatableComponent,
    Column100ChartComponent,
    Column100ChartAbonneComponent,
    Column100ChartEnergieComponent,
    Column100ChartRevenuComponent,
    DetailChartComponent,
    GraphDownloadComponent,
    FaitSuiviAbonneComponent,
    DetailAbonneComponent,
    AfficherAbonneComponent,
    StatsAbonneComponent,
    FaitSuiviRevenuComponent,
    DetailRevenuComponent,
    StatsRevenuComponent,
    FaitSuiviEnergieComponent,
    StatsEnergieComponent,
    DetailEnergieComponent,
    FaitSuiviSollComponent,
    DetailSollComponent,
    StatsSollComponent,
    DonutChartComponent,
    InfosAbonneComponent,
    StatsAllDomaineComponent,
    SelectIndicEnergieComponent,
    SelectIndicAbonneComponent,
    SelectPeriodeModalComponent,
    DragDropEnergieComponent,
    DragDropAbonneComponent,
    ResultModalEnergieComponent,
    ResultModalAbonneComponent,
    SelectIndicRevenuComponent,
    DragDrogRevenuComponent,
    PiechartStackRevenuComponent,
    SelectIndicSollComponent,
    DragDropSollComponent,
    ResultModalSollComponent,
    ResultModalRevenuComponent,
    PiechartStackSollComponent,
   

  ],
  imports: [
    CommonModule,
    NgbToastModule,
    FeatherModule.pick(allIcons),
    CountToModule,
    LeafletModule,
    NgbDropdownModule,
    NgxPaginationModule,
    HttpClientModule,
    NgbNavModule,
    NgbModule,
    MatDialogModule,
    
    MatTableModule,
    MatPaginatorModule,
    SimplebarAngularModule,
    BsDatepickerModule.forRoot(),
    NgApexchartsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    NgSelectModule,
    NgxUsefulSwiperModule,
    NgbDatepickerModule,
    DragDropModule,   // ✅ obligatoire
    
    CalendarModule,
    FlatpickrModule.forRoot(),
    DashboardsRoutingModule,
    SharedModule,
    WidgetModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
  ],   schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers : [
    AbonneService,DateRangeService, ApiTableConfigService
  ]
})
export class DashboardsModule { }
