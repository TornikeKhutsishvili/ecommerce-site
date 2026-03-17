import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Laptops } from './laptops';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('Laptops', () => {
  let component: Laptops;
  let fixture: ComponentFixture<Laptops>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Laptops,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Laptops);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
