import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenShirts } from './men-shirts';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('MenShirts', () => {
  let component: MenShirts;
  let fixture: ComponentFixture<MenShirts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MenShirts,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenShirts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
