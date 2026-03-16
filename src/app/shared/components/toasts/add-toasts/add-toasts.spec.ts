import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToasts } from './add-toasts';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('AddToasts', () => {
  let component: AddToasts;
  let fixture: ComponentFixture<AddToasts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AddToasts,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToasts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
