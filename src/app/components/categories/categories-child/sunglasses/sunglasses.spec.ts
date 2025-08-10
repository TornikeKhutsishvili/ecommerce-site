import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sunglasses } from './sunglasses';

describe('Sunglasses', () => {
  let component: Sunglasses;
  let fixture: ComponentFixture<Sunglasses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sunglasses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sunglasses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
