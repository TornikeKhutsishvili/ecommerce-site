import { TestBed } from '@angular/core/testing';

import { AdminAnalyticsService } from './admin-analytics-service';

describe('AdminAnalyticsService', () => {
  let service: AdminAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
