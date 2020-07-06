import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationUsersListComponent } from './conversation-users-list.component';

describe('ConversationUsersListComponent', () => {
  let component: ConversationUsersListComponent;
  let fixture: ComponentFixture<ConversationUsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationUsersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
