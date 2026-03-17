import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Smartphones } from './smartphones';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('Smartphones', () => {
  let component: Smartphones;
  let fixture: ComponentFixture<Smartphones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Smartphones,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Smartphones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
