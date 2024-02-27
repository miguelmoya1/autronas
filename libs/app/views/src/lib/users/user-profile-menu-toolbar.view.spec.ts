import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileMenuToolbarView } from './user-profile-menu-toolbar.view';

describe('UserProfileMenuToolbarView', () => {
  let component: UserProfileMenuToolbarView;
  let fixture: ComponentFixture<UserProfileMenuToolbarView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileMenuToolbarView],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileMenuToolbarView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
