import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vehicle } from './vehicle';

describe('Vehicle', () => {
  let component: Vehicle;
  let fixture: ComponentFixture<Vehicle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vehicle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Vehicle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
