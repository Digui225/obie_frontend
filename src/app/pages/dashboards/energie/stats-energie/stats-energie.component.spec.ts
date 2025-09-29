import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsEnergieComponent } from './stats-energie.component';

describe('StatsEnergieComponent', () => {
  let component: StatsEnergieComponent;
  let fixture: ComponentFixture<StatsEnergieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsEnergieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsEnergieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
