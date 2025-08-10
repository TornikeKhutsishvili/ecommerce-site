import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkinCare } from './skin-care';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('SkinCare', () => {
  let component: SkinCare;
  let fixture: ComponentFixture<SkinCare>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SkinCare,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkinCare);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
