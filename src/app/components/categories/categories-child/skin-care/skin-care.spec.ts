import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkinCare } from './skin-care';

describe('SkinCare', () => {
  let component: SkinCare;
  let fixture: ComponentFixture<SkinCare>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkinCare]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkinCare);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
