import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tops } from './tops';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('Tops', () => {
  let component: Tops;
  let fixture: ComponentFixture<Tops>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Tops,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tops);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
