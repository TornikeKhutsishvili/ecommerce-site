import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomensJewellery } from './womens-jewellery';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('WomensJewellery', () => {
  let component: WomensJewellery;
  let fixture: ComponentFixture<WomensJewellery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WomensJewellery,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WomensJewellery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
