import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropSollComponent } from './drag-drop-soll.component';

describe('DragDropSollComponent', () => {
  let component: DragDropSollComponent;
  let fixture: ComponentFixture<DragDropSollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragDropSollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragDropSollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
