import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sunglasses } from './sunglasses';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('Sunglasses', () => {
  let component: Sunglasses;
  let fixture: ComponentFixture<Sunglasses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Sunglasses,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sunglasses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
