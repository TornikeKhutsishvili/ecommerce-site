import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomensBags } from './womens-bags';

describe('WomensBags', () => {
  let component: WomensBags;
  let fixture: ComponentFixture<WomensBags>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WomensBags]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WomensBags);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
