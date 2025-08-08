import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsAccessories } from './sports-accessories';

describe('SportsAccessories', () => {
  let component: SportsAccessories;
  let fixture: ComponentFixture<SportsAccessories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportsAccessories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportsAccessories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
