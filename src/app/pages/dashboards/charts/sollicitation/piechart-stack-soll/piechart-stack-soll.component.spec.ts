import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiechartStackSollComponent } from './piechart-stack-soll.component';

describe('PiechartStackSollComponent', () => {
  let component: PiechartStackSollComponent;
  let fixture: ComponentFixture<PiechartStackSollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiechartStackSollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiechartStackSollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
