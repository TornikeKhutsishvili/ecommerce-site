import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule } from '@ngx-translate/core';

export const appConfig: ApplicationConfig = {

  providers: [

    provideHttpClient(withFetch()),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // Provide ngx-translate core
    importProvidersFrom(
      TranslateModule.forRoot({
        fallbackLang: 'en'
      })
    ),

    // Provide ngx-translate http-loader (new API)
    provideTranslateHttpLoader({
      prefix: './assets/i18n/',
      suffix: '.json'
    })

  ]

};