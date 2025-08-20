import {
  Inject,
  PLATFORM_ID,
  Injectable,
  inject
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class Language {

  private fallbackLang = 'en';
  private availableLangs = ['en', 'ge'];

  public translate = inject(TranslateService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    const lang = this.getSavedLang() || this.getBrowserLang() || this.fallbackLang;
    this.setLanguage(lang);
  }


  getCurrentLang(): string {
    return this.translate.currentLang || this.fallbackLang;
  }


  setLanguage(lang: string): void {
    if (!this.availableLangs.includes(lang)) return;

    this.translate.use(lang);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', lang);
    }
  }


  private getSavedLang(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const lang = localStorage.getItem('lang');
      return this.availableLangs.includes(lang ?? '') ? lang : null;
    }
    return null;
  }


  private getBrowserLang(): string | null {
    const browserLang = this.translate.getBrowserLang?.();
    return browserLang && this.availableLangs.includes(browserLang) ? browserLang : null;
  }

}