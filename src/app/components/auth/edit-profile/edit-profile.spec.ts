import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfile } from './edit-profile';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditProfile', () => {
  let component: EditProfile;
  let fixture: ComponentFixture<EditProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EditProfile,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
