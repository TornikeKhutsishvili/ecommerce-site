import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomensDresses } from './womens-dresses';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('WomensDresses', () => {
  let component: WomensDresses;
  let fixture: ComponentFixture<WomensDresses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WomensDresses,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WomensDresses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
