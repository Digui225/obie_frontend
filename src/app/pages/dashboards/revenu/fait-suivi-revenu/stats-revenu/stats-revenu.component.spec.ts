import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsRevenuComponent } from './stats-revenu.component';

describe('StatsRevenuComponent', () => {
  let component: StatsRevenuComponent;
  let fixture: ComponentFixture<StatsRevenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsRevenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsRevenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
