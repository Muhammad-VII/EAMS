import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVacationRequestComponent } from './add-vacation-request.component';

describe('AddVacationRequestComponent', () => {
  let component: AddVacationRequestComponent;
  let fixture: ComponentFixture<AddVacationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVacationRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddVacationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
