import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAccessories } from './mobile-accessories';

describe('MobileAccessories', () => {
  let component: MobileAccessories;
  let fixture: ComponentFixture<MobileAccessories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileAccessories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileAccessories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
