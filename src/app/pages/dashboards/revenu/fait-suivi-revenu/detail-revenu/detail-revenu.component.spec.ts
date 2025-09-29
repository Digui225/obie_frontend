import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRevenuComponent } from './detail-revenu.component';

describe('DetailRevenuComponent', () => {
  let component: DetailRevenuComponent;
  let fixture: ComponentFixture<DetailRevenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailRevenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailRevenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
