import {
  Pipe,
  PipeTransform
} from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import en from '../../assets/i18n/en.json';
import ge from '../../assets/i18n/ge.json';

@Pipe({
  name: 'language',
  standalone: true
})
export class LanguagePipe implements PipeTransform {

  constructor(private translate: TranslateService) {}

  transform(items: any[], search: string, field: string): any[] {
    if (!items || !search) return items;

    search = search.toLowerCase();

    return items.filter(item => {
      const translated = this.translate.instant(item[field])?.toLowerCase() || '';
      return translated.includes(search);
    });
  }

  // get available language
  getAvailableLanguages(): string[] {
    return Object.keys({ en, ge });
  }

}
