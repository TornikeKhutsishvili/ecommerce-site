import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Beauty } from './beauty';

describe('Beauty', () => {
  let component: Beauty;
  let fixture: ComponentFixture<Beauty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Beauty]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Beauty);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
