import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicChartEnergieComponent } from './basic-chart-energie.component';

describe('BasicChartEnergieComponent', () => {
  let component: BasicChartEnergieComponent;
  let fixture: ComponentFixture<BasicChartEnergieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicChartEnergieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicChartEnergieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
