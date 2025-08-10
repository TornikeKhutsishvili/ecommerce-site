import { TestBed } from '@angular/core/testing';

import { Language } from './language';

import { TranslateModule } from '@ngx-translate/core';

describe('Language', () => {
  let service: Language;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot()
      ]
    });
    service = TestBed.inject(Language);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
