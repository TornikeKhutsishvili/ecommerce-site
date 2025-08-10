import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenShoes } from './men-shoes';

describe('MenShoes', () => {
  let component: MenShoes;
  let fixture: ComponentFixture<MenShoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenShoes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenShoes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
