import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tablets } from './tablets';

describe('Tablets', () => {
  let component: Tablets;
  let fixture: ComponentFixture<Tablets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tablets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tablets);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
