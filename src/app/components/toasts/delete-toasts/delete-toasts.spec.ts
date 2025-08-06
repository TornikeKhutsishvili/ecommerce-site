import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteToasts } from './delete-toasts';

describe('DeleteToasts', () => {
  let component: DeleteToasts;
  let fixture: ComponentFixture<DeleteToasts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteToasts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteToasts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
