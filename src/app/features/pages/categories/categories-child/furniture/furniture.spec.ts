import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Furniture } from './furniture';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('Furniture', () => {
  let component: Furniture;
  let fixture: ComponentFixture<Furniture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Furniture,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Furniture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
