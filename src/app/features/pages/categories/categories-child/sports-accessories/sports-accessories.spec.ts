import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsAccessories } from './sports-accessories';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('SportsAccessories', () => {
  let component: SportsAccessories;
  let fixture: ComponentFixture<SportsAccessories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SportsAccessories,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportsAccessories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
