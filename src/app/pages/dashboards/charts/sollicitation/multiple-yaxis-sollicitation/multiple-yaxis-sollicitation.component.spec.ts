import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleYaxisSollicitationComponent } from './multiple-yaxis-sollicitation.component';

describe('MultipleYaxisSollicitationComponent', () => {
  let component: MultipleYaxisSollicitationComponent;
  let fixture: ComponentFixture<MultipleYaxisSollicitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleYaxisSollicitationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleYaxisSollicitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
