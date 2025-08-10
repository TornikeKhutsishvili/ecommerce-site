import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomensWatches } from './womens-watches';

describe('WomensWatches', () => {
  let component: WomensWatches;
  let fixture: ComponentFixture<WomensWatches>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WomensWatches]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WomensWatches);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
