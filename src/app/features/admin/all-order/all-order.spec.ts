import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOrder } from './all-order';

describe('AllOrder', () => {
  let component: AllOrder;
  let fixture: ComponentFixture<AllOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllOrder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllOrder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
