import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectIndicRevenuComponent } from './select-indic-revenu.component';

describe('SelectIndicRevenuComponent', () => {
  let component: SelectIndicRevenuComponent;
  let fixture: ComponentFixture<SelectIndicRevenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectIndicRevenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectIndicRevenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
