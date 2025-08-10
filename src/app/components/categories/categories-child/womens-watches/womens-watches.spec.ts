import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomensWatches } from './womens-watches';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('WomensWatches', () => {
  let component: WomensWatches;
  let fixture: ComponentFixture<WomensWatches>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WomensWatches,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WomensWatches);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
