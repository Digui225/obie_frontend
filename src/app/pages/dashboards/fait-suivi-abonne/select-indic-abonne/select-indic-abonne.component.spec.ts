import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectIndicAbonneComponent } from './select-indic-abonne.component';

describe('SelectIndicAbonneComponent', () => {
  let component: SelectIndicAbonneComponent;
  let fixture: ComponentFixture<SelectIndicAbonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectIndicAbonneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectIndicAbonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
