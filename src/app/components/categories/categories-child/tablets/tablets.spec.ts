import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tablets } from './tablets';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('Tablets', () => {
  let component: Tablets;
  let fixture: ComponentFixture<Tablets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Tablets,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tablets);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
