import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsAbonneComponent } from './stats-abonne.component';

describe('StatsAbonneComponent', () => {
  let component: StatsAbonneComponent;
  let fixture: ComponentFixture<StatsAbonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsAbonneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsAbonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
