import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDecoration } from './home-decoration';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('HomeDecoration', () => {
  let component: HomeDecoration;
  let fixture: ComponentFixture<HomeDecoration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeDecoration,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeDecoration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
