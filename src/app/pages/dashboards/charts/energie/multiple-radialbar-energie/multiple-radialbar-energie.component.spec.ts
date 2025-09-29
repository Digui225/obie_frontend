import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleRadialbarEnergieComponent } from './multiple-radialbar-energie.component';

describe('MultipleRadialbarEnergieComponent', () => {
  let component: MultipleRadialbarEnergieComponent;
  let fixture: ComponentFixture<MultipleRadialbarEnergieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleRadialbarEnergieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleRadialbarEnergieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
