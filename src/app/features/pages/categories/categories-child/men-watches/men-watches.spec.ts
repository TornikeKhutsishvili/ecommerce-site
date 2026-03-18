import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenWatches } from './men-watches';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('MenWatches', () => {
  let component: MenWatches;
  let fixture: ComponentFixture<MenWatches>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MenWatches,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenWatches);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
