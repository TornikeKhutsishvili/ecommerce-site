import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAnalytics } from './dashboard-analytics';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('DashboardAnalytics', () => {
  let component: DashboardAnalytics;
  let fixture: ComponentFixture<DashboardAnalytics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardAnalytics,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
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
