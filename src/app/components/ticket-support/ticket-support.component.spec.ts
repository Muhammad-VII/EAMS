import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSupportComponent } from './ticket-support.component';

describe('TicketSupportComponent', () => {
  let component: TicketSupportComponent;
  let fixture: ComponentFixture<TicketSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketSupportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
