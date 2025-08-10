import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenWatches } from './men-watches';

describe('MenWatches', () => {
  let component: MenWatches;
  let fixture: ComponentFixture<MenWatches>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenWatches]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenWatches);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
