import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendenceRequestComponent } from './attendence-request.component';

describe('AttendenceRequestComponent', () => {
  let component: AttendenceRequestComponent;
  let fixture: ComponentFixture<AttendenceRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendenceRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendenceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
