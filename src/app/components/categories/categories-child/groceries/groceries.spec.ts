import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Groceries } from './groceries';

describe('Groceries', () => {
  let component: Groceries;
  let fixture: ComponentFixture<Groceries>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Groceries]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Groceries);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
