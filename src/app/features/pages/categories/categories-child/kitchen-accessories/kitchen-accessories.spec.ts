import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenAccessories } from './kitchen-accessories';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('KitchenAccessories', () => {
  let component: KitchenAccessories;
  let fixture: ComponentFixture<KitchenAccessories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        KitchenAccessories,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitchenAccessories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
