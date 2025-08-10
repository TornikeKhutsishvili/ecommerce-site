import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSelector } from './language-selector';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule  } from '@ngx-translate/core';

describe('LanguageSelector', () => {
  let component: LanguageSelector;
  let fixture: ComponentFixture<LanguageSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LanguageSelector,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
