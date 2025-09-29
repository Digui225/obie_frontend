import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaitSuiviEnergieComponent } from './fait-suivi-energie.component';

describe('FaitSuiviEnergieComponent', () => {
  let component: FaitSuiviEnergieComponent;
  let fixture: ComponentFixture<FaitSuiviEnergieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaitSuiviEnergieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaitSuiviEnergieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
