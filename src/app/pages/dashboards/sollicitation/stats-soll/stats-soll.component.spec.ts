import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsSollComponent } from './stats-soll.component';

describe('StatsSollComponent', () => {
  let component: StatsSollComponent;
  let fixture: ComponentFixture<StatsSollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsSollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsSollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
