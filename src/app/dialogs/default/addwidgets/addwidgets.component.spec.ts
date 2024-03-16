import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddwidgetsComponent } from './addwidgets.component';

describe('AddwidgetsComponent', () => {
  let component: AddwidgetsComponent;
  let fixture: ComponentFixture<AddwidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddwidgetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddwidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
