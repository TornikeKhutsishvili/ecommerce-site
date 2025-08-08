import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenShirts } from './men-shirts';

describe('MenShirts', () => {
  let component: MenShirts;
  let fixture: ComponentFixture<MenShirts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenShirts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenShirts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
