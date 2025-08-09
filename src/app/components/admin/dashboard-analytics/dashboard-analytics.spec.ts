import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAnalytics } from './dashboard-analytics';

describe('DashboardAnalytics', () => {
  let component: DashboardAnalytics;
  let fixture: ComponentFixture<DashboardAnalytics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAnalytics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAnalytics);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
