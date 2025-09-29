import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaitSuiviRevenuComponent } from './fait-suivi-revenu.component';

describe('FaitSuiviRevenuComponent', () => {
  let component: FaitSuiviRevenuComponent;
  let fixture: ComponentFixture<FaitSuiviRevenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaitSuiviRevenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaitSuiviRevenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
