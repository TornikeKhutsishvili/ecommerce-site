import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Smartphones } from './smartphones';

describe('Smartphones', () => {
  let component: Smartphones;
  let fixture: ComponentFixture<Smartphones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Smartphones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Smartphones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
