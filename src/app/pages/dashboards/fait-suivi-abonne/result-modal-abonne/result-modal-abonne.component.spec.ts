import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultModalAbonneComponent } from './result-modal-abonne.component';

describe('ResultModalAbonneComponent', () => {
  let component: ResultModalAbonneComponent;
  let fixture: ComponentFixture<ResultModalAbonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultModalAbonneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultModalAbonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
