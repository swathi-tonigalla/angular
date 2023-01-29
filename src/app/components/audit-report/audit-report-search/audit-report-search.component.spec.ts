import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditReportSearchComponent } from './audit-report-search.component';

describe('AuditReportSearchComponent', () => {
  let component: AuditReportSearchComponent;
  let fixture: ComponentFixture<AuditReportSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditReportSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditReportSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
