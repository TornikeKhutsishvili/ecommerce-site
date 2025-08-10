import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ],
  templateUrl: './language-selector.html',
  styleUrls: ['./language-selector.scss']
})
export class LanguageSelector {

  // public translate = Inject(TranslateService);

  // constructor (@Inject(PLATFORM_ID) private platformId: Object) {
  //   this.translate.setDefaultLang('en');

  //   if (isPlatformBrowser(this.platformId)) {
  //     const savedLang = localStorage.getItem('lang');
  //     this.translate.use(savedLang || 'en');
  //   }
  // }

  // changeLanguage(langCode: string): void {
  //   this.translate.use(langCode);

  //   if (isPlatformBrowser(this.platformId)) {
  //     localStorage.setItem('lang', langCode);
  //   }
  // }

}
