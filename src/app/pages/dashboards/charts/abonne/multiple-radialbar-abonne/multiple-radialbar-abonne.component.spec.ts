import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleRadialbarAbonneComponent } from './multiple-radialbar-abonne.component';

describe('MultipleRadialbarAbonneComponent', () => {
  let component: MultipleRadialbarAbonneComponent;
  let fixture: ComponentFixture<MultipleRadialbarAbonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleRadialbarAbonneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleRadialbarAbonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
