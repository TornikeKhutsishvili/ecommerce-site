import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomensJewellery } from './womens-jewellery';

describe('WomensJewellery', () => {
  let component: WomensJewellery;
  let fixture: ComponentFixture<WomensJewellery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WomensJewellery]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WomensJewellery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
