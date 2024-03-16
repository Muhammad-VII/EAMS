import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyInsuranceComponent } from './add-company-insurance.component';

describe('AddCompanyInsuranceComponent', () => {
  let component: AddCompanyInsuranceComponent;
  let fixture: ComponentFixture<AddCompanyInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCompanyInsuranceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCompanyInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
