import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomensShoes } from './womens-shoes';

describe('WomensShoes', () => {
  let component: WomensShoes;
  let fixture: ComponentFixture<WomensShoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WomensShoes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WomensShoes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
