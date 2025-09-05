import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rules } from './rules';

describe('Rules', () => {
  let component: Rules;
  let fixture: ComponentFixture<Rules>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rules]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rules);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
