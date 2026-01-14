import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphBarEnergieComponent } from './graph-bar-energie.component';

describe('GraphBarEnergieComponent', () => {
  let component: GraphBarEnergieComponent;
  let fixture: ComponentFixture<GraphBarEnergieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphBarEnergieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphBarEnergieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
