import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphePersoComponent } from './graphe-perso.component';

describe('GraphePersoComponent', () => {
  let component: GraphePersoComponent;
  let fixture: ComponentFixture<GraphePersoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphePersoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphePersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
