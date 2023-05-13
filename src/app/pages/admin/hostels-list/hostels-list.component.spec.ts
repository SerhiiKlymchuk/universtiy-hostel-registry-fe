import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelsListComponent } from './hostels-list.component';

describe('HostelsListComponent', () => {
  let component: HostelsListComponent;
  let fixture: ComponentFixture<HostelsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostelsListComponent]
    });
    fixture = TestBed.createComponent(HostelsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
