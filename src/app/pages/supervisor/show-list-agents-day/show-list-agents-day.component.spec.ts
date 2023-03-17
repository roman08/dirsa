import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowListAgentsDayComponent } from './show-list-agents-day.component';

describe('ShowListAgentsDayComponent', () => {
  let component: ShowListAgentsDayComponent;
  let fixture: ComponentFixture<ShowListAgentsDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowListAgentsDayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowListAgentsDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
