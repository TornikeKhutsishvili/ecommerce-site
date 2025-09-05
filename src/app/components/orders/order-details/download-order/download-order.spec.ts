import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadOrder } from './download-order';

describe('DownloadOrder', () => {
  let component: DownloadOrder;
  let fixture: ComponentFixture<DownloadOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadOrder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadOrder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
