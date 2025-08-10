import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Motorcycle } from './motorcycle';

describe('Motorcycle', () => {
  let component: Motorcycle;
  let fixture: ComponentFixture<Motorcycle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Motorcycle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Motorcycle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
