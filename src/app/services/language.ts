// import { isPlatformBrowser } from '@angular/common';
// import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class Language {

//   private defaultLang = 'en';
//   private availableLangs = ['en', 'ge'];
//   private translate = Inject(TranslateService);

//   constructor(
//     @Inject(PLATFORM_ID) private platformId: Object
//   ) {
//     this.translate.addLangs(this.availableLangs);
//     this.translate.setDefaultLang(this.defaultLang);

//     const lang = this.getSavedLang() || this.getBrowserLang() || this.defaultLang;
//     this.setLanguage(lang);
//   }

//   getCurrentLang(): string {
//     return this.translate.currentLang || this.defaultLang;
//   }

//   setLanguage(lang: string): void {
//     if (!this.availableLangs.includes(lang)) return;

//     this.translate.use(lang);

//     if (isPlatformBrowser(this.platformId)) {
//       localStorage.setItem('lang', lang);
//     }
//   }

//   private getSavedLang(): string | null {
//     if (isPlatformBrowser(this.platformId)) {
//       const lang = localStorage.getItem('lang');
//       return this.availableLangs.includes(lang ?? '') ? lang : null;
//     }
//     return null;
//   }

//   private getBrowserLang(): string | null {
//     const browserLang = this.translate.getBrowserLang();
//     return browserLang && this.availableLangs.includes(browserLang.toUpperCase()) ? browserLang.toUpperCase() : null;
//   }

// }




import { Inject, PLATFORM_ID, Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class Language {

  private defaultLang = 'en';
  private availableLangs = ['en', 'ge'];

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {

    const lang = this.getSavedLang() || this.getBrowserLang() || this.defaultLang;
    this.setLanguage(lang);

  }

  getCurrentLang(): string {
    return this.translate.currentLang || this.defaultLang;
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
