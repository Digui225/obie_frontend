import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Column100ChartEnergieComponent } from './column100-chart-energie.component';

describe('Column100ChartEnergieComponent', () => {
  let component: Column100ChartEnergieComponent;
  let fixture: ComponentFixture<Column100ChartEnergieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Column100ChartEnergieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Column100ChartEnergieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
