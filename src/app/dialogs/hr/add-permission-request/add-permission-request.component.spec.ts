import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPermissionRequestComponent } from './add-permission-request.component';

describe('AddPermissionRequestComponent', () => {
  let component: AddPermissionRequestComponent;
  let fixture: ComponentFixture<AddPermissionRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPermissionRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPermissionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
