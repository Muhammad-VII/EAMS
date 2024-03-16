import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIdentityComponent } from './add-identity.component';

describe('AddIdentityComponent', () => {
  let component: AddIdentityComponent;
  let fixture: ComponentFixture<AddIdentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddIdentityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
