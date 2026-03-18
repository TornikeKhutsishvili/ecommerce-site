import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomensBags } from './womens-bags';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('WomensBags', () => {
  let component: WomensBags;
  let fixture: ComponentFixture<WomensBags>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WomensBags,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WomensBags);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
