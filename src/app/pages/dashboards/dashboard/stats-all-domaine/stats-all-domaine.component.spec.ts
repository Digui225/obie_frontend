import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsAllDomaineComponent } from './stats-all-domaine.component';

describe('StatsAllDomaineComponent', () => {
  let component: StatsAllDomaineComponent;
  let fixture: ComponentFixture<StatsAllDomaineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsAllDomaineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsAllDomaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
