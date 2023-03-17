import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowListAgentsDangerComponent } from './show-list-agents-danger.component';

describe('ShowListAgentsDangerComponent', () => {
  let component: ShowListAgentsDangerComponent;
  let fixture: ComponentFixture<ShowListAgentsDangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowListAgentsDangerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowListAgentsDangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
