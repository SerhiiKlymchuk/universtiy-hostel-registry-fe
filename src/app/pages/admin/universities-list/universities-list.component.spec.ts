import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversitiesListComponent } from './universities-list.component';

describe('UniversitiesListComponent', () => {
  let component: UniversitiesListComponent;
  let fixture: ComponentFixture<UniversitiesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UniversitiesListComponent]
    });
    fixture = TestBed.createComponent(UniversitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
