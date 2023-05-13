import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelEditCreateComponent } from './user-edit-create.component';

describe('HostelEditCreateComponent', () => {
  let component: HostelEditCreateComponent;
  let fixture: ComponentFixture<HostelEditCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostelEditCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostelEditCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
