import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleRadialbarRevenuComponent } from './multiple-radialbar-revenu.component';

describe('MultipleRadialbarRevenuComponent', () => {
  let component: MultipleRadialbarRevenuComponent;
  let fixture: ComponentFixture<MultipleRadialbarRevenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleRadialbarRevenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleRadialbarRevenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
