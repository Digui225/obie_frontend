import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicChartAbonneComponent } from './basic-chart-abonne.component';

describe('BasicChartAbonneComponent', () => {
  let component: BasicChartAbonneComponent;
  let fixture: ComponentFixture<BasicChartAbonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicChartAbonneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicChartAbonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
