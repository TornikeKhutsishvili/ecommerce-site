import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteToasts } from './delete-toasts';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('DeleteToasts', () => {
  let component: DeleteToasts;
  let fixture: ComponentFixture<DeleteToasts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DeleteToasts,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteToasts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
