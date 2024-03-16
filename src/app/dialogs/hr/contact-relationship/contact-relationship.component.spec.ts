import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactRelationshipComponent } from './contact-relationship.component';

describe('ContactRelationshipComponent', () => {
  let component: ContactRelationshipComponent;
  let fixture: ComponentFixture<ContactRelationshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactRelationshipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactRelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
