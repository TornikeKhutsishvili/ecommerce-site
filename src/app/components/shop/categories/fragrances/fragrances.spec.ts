import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fragrances } from './fragrances';

describe('Fragrances', () => {
  let component: Fragrances;
  let fixture: ComponentFixture<Fragrances>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fragrances]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fragrances);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
