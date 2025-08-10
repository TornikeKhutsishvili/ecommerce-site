import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Beauty } from './beauty';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('Beauty', () => {
  let component: Beauty;
  let fixture: ComponentFixture<Beauty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Beauty,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Beauty);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
