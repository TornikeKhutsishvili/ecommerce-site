import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Groceries } from './groceries';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('Groceries', () => {
  let component: Groceries;
  let fixture: ComponentFixture<Groceries>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Groceries,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Groceries);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
