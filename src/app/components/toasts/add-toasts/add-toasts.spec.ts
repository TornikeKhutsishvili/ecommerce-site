import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToasts } from './add-toasts';

describe('AddToasts', () => {
  let component: AddToasts;
  let fixture: ComponentFixture<AddToasts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToasts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToasts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
