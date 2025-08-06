import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptToasts } from './accept-toasts';

describe('AcceptToasts', () => {
  let component: AcceptToasts;
  let fixture: ComponentFixture<AcceptToasts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptToasts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptToasts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
