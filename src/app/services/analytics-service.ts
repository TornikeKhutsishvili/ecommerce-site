import { HttpClient } from '@angular/common/http';

import {
  Injectable,
  inject
} from '@angular/core';

export type AnalyticsEventName =
  | 'page_view'
  | 'search'
  | 'view_item'
  | 'add_to_cart'
  | 'begin_checkout'
  | 'purchase';

export interface AnalyticsEvent<T = Record<string, any>> {
  name: AnalyticsEventName;
  ts: number;               // epoch ms
  uid?: string;             // authenticated user id (თუ გაქვს)
  sessionId: string;        // client session id
  payload?: T;
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {

  // Inject HttpClient for API requests
  private http = inject(HttpClient);
  private endpoint = '/api/analytics/events';
  private buffer: AnalyticsEvent[] = [];
  private maxBuffer = 20;
  private flushIntervalMs = 8000;
  private sessionId = this.ensureSession();

  constructor() {
    // periodic flush
    setInterval(() => this.flush(), this.flushIntervalMs);
    // page hide/unload
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') this.flush(true);
    });
  }

  // track<T = any>(name: AnalyticsEventName, payload?: T, uid?: string) {
  track<T extends Record<string, any> | undefined = any>(name: AnalyticsEventName, payload?: T, uid?: string) {
    this.buffer.push({
      name,
      payload,
      uid,
      ts: Date.now(),
      sessionId: this.sessionId,
    });
    if (this.buffer.length >= this.maxBuffer) this.flush();
  }

  trackPageView(path = location.pathname, uid?: string) {
    this.track('page_view', { path, ref: document.referrer }, uid);
  }

  async flush(useBeacon = false) {
    if (!this.buffer.length) return;
    const events = this.buffer.splice(0, this.buffer.length);

    try {
      if (useBeacon && 'sendBeacon' in navigator) {
        const blob = new Blob([JSON.stringify({ events })], { type: 'application/json' });
        navigator.sendBeacon(this.endpoint, blob);
      } else {
        await this.http.post(this.endpoint, { events }).toPromise();
      }
    } catch {
      // rollback on failure
      this.buffer.unshift(...events);
    }
  }

  private ensureSession(): string {
    const KEY = 'tkshop_session_id';
    let sid = localStorage.getItem(KEY);
    if (!sid) {
      sid = crypto.randomUUID();
      localStorage.setItem(KEY, sid);
    }
    return sid;
  }

}