import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropAbonneComponent } from './drag-drop-abonne.component';

describe('DragDropAbonneComponent', () => {
  let component: DragDropAbonneComponent;
  let fixture: ComponentFixture<DragDropAbonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragDropAbonneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragDropAbonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
