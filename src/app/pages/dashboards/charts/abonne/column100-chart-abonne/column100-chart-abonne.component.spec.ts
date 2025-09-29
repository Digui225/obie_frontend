import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Column100ChartAbonneComponent } from './column100-chart-abonne.component';

describe('Column100ChartAbonneComponent', () => {
  let component: Column100ChartAbonneComponent;
  let fixture: ComponentFixture<Column100ChartAbonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Column100ChartAbonneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Column100ChartAbonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
