import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIncentiveRequestComponent } from './add-incentive-request.component';

describe('AddIncentiveRequestComponent', () => {
  let component: AddIncentiveRequestComponent;
  let fixture: ComponentFixture<AddIncentiveRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddIncentiveRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddIncentiveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
