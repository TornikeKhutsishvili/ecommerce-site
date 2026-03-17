import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProduct } from './edit-product';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditProduct', () => {
  let component: EditProduct;
  let fixture: ComponentFixture<EditProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EditProduct,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
