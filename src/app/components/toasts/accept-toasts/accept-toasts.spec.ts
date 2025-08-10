import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptToasts } from './accept-toasts';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('AcceptToasts', () => {
  let component: AcceptToasts;
  let fixture: ComponentFixture<AcceptToasts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AcceptToasts,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptToasts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
