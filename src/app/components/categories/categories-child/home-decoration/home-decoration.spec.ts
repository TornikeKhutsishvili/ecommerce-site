import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDecoration } from './home-decoration';

describe('HomeDecoration', () => {
  let component: HomeDecoration;
  let fixture: ComponentFixture<HomeDecoration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeDecoration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeDecoration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
