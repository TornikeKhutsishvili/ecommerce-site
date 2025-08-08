import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tops } from './tops';

describe('Tops', () => {
  let component: Tops;
  let fixture: ComponentFixture<Tops>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tops]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tops);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
