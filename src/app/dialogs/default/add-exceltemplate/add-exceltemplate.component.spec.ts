import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExceltemplateComponent } from './add-exceltemplate.component';

describe('AddExceltemplateComponent', () => {
  let component: AddExceltemplateComponent;
  let fixture: ComponentFixture<AddExceltemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExceltemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddExceltemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
