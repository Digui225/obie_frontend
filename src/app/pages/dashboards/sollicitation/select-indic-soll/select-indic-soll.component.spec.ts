import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectIndicSollComponent } from './select-indic-soll.component';

describe('SelectIndicSollComponent', () => {
  let component: SelectIndicSollComponent;
  let fixture: ComponentFixture<SelectIndicSollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectIndicSollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectIndicSollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
