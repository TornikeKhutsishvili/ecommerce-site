import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertToasts } from './alert-toasts';

describe('AlertToasts', () => {
  let component: AlertToasts;
  let fixture: ComponentFixture<AlertToasts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertToasts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertToasts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
