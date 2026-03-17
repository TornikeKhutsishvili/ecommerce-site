import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomensShoes } from './womens-shoes';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('WomensShoes', () => {
  let component: WomensShoes;
  let fixture: ComponentFixture<WomensShoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WomensShoes,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WomensShoes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
