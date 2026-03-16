import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carusel } from './carusel';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('Carusel', () => {
  let component: Carusel;
  let fixture: ComponentFixture<Carusel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Carusel,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Carusel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
