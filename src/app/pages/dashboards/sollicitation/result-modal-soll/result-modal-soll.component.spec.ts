import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultModalSollComponent } from './result-modal-soll.component';

describe('ResultModalSollComponent', () => {
  let component: ResultModalSollComponent;
  let fixture: ComponentFixture<ResultModalSollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultModalSollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultModalSollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
