import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultModalRevenuComponent } from './result-modal-revenu.component';

describe('ResultModalRevenuComponent', () => {
  let component: ResultModalRevenuComponent;
  let fixture: ComponentFixture<ResultModalRevenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultModalRevenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultModalRevenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
