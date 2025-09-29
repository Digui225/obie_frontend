import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleradialbarComponent } from './multipleradialbar.component';

describe('MultipleradialbarComponent', () => {
  let component: MultipleradialbarComponent;
  let fixture: ComponentFixture<MultipleradialbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleradialbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleradialbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
