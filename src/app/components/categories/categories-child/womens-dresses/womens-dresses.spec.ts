import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomensDresses } from './womens-dresses';

describe('WomensDresses', () => {
  let component: WomensDresses;
  let fixture: ComponentFixture<WomensDresses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WomensDresses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WomensDresses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
