import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenShoes } from './men-shoes';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('MenShoes', () => {
  let component: MenShoes;
  let fixture: ComponentFixture<MenShoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MenShoes,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenShoes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
