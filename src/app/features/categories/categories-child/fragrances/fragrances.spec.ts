import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fragrances } from './fragrances';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('Fragrances', () => {
  let component: Fragrances;
  let fixture: ComponentFixture<Fragrances>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Fragrances,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fragrances);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
