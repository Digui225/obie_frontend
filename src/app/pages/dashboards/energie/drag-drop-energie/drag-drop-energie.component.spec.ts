import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropEnergieComponent } from './drag-drop-energie.component';

describe('DragDropEnergieComponent', () => {
  let component: DragDropEnergieComponent;
  let fixture: ComponentFixture<DragDropEnergieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragDropEnergieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragDropEnergieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
