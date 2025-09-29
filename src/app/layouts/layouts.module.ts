import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';

import { SimplebarAngularModule } from 'simplebar-angular';
import { LanguageService } from '../core/services/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms'; // Importer FormsModule


// Component pages
import { LayoutComponent } from './layout.component';
import { VerticalComponent } from './vertical/vertical.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
//import { RightsidebarComponent } from './rightsidebar/rightsidebar.component';
import { ChatButtonComponent } from './chat-button/chat-button.component';
import { ResultsModalComponent } from './results-modal/results-modal.component';




@NgModule({
  declarations: [
    LayoutComponent,
    VerticalComponent,
    TopbarComponent,
    SidebarComponent,
    FooterComponent,
    ChatButtonComponent,
    ResultsModalComponent,

   
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbDropdownModule,
    NgChartsModule,
    NgbNavModule,
    FormsModule, // Ajouter FormsModule à l'importation dans le module parent pour utiliser le ngModel directive dans les formulaires.
    SimplebarAngularModule,
    TranslateModule,
  ],
  providers: [LanguageService]
})
export class LayoutsModule { }
