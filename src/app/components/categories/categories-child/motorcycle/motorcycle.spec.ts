import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Motorcycle } from './motorcycle';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('Motorcycle', () => {
  let component: Motorcycle;
  let fixture: ComponentFixture<Motorcycle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Motorcycle,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Motorcycle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
