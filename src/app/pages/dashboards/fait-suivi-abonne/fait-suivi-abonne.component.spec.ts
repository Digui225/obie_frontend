import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaitSuiviAbonneComponent } from './fait-suivi-abonne.component';

describe('FaitSuiviAbonneComponent', () => {
  let component: FaitSuiviAbonneComponent;
  let fixture: ComponentFixture<FaitSuiviAbonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaitSuiviAbonneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaitSuiviAbonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
