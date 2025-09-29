import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultModalEnergieComponent } from './result-modal-energie.component';

describe('ResultModalEnergieComponent', () => {
  let component: ResultModalEnergieComponent;
  let fixture: ComponentFixture<ResultModalEnergieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultModalEnergieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultModalEnergieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
