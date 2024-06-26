import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthDtoService } from '@autronas/frontend/actions';
import { StoreService } from '@autronas/frontend/store';
import { UserProfileMenuToolbarView } from './user-profile-menu-toolbar.view';

jest.mock('@autronas/frontend/actions');
jest.mock('@autronas/frontend/store');

describe('UserProfileMenuToolbarView', () => {
  let component: UserProfileMenuToolbarView;
  let fixture: ComponentFixture<UserProfileMenuToolbarView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileMenuToolbarView],
      providers: [
        StoreService,
        AuthDtoService,
        {
          provide: Router,
          useValue: {
            navigate: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileMenuToolbarView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
