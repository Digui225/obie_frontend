import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDrogRevenuComponent } from './drag-drog-revenu.component';

describe('DragDrogRevenuComponent', () => {
  let component: DragDrogRevenuComponent;
  let fixture: ComponentFixture<DragDrogRevenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragDrogRevenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragDrogRevenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
