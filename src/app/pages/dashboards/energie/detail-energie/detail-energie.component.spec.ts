import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEnergieComponent } from './detail-energie.component';

describe('DetailEnergieComponent', () => {
  let component: DetailEnergieComponent;
  let fixture: ComponentFixture<DetailEnergieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailEnergieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailEnergieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
