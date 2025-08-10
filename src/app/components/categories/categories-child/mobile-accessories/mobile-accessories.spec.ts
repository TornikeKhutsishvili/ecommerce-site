import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAccessories } from './mobile-accessories';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('MobileAccessories', () => {
  let component: MobileAccessories;
  let fixture: ComponentFixture<MobileAccessories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MobileAccessories,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileAccessories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
