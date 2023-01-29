import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchuserpermissiontableComponent } from './searchuserpermissiontable.component';

describe('SearchuserpermissiontableComponent', () => {
  let component: SearchuserpermissiontableComponent;
  let fixture: ComponentFixture<SearchuserpermissiontableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchuserpermissiontableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchuserpermissiontableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 

  it('should create', () => {
    expect(component).toBeGreaterThan(5)
  });
});
