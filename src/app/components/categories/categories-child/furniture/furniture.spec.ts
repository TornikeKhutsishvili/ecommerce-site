import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Furniture } from './furniture';

describe('Furniture', () => {
  let component: Furniture;
  let fixture: ComponentFixture<Furniture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Furniture]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Furniture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
