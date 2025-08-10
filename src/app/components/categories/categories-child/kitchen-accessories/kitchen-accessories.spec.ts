import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenAccessories } from './kitchen-accessories';

describe('KitchenAccessories', () => {
  let component: KitchenAccessories;
  let fixture: ComponentFixture<KitchenAccessories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitchenAccessories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitchenAccessories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
