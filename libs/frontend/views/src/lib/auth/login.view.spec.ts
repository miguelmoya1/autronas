import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthDtoService } from '@autronas/frontend/actions';
import { StoreService } from '@autronas/frontend/store';
import { LoginView } from './login.view';

jest.mock('@autronas/frontend/store');
jest.mock('@autronas/frontend/actions');

describe('LoginView', () => {
  let component: LoginView;
  let fixture: ComponentFixture<LoginView>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthDtoService,
        StoreService,
        {
          provide: Router,
          useValue: {},
        },
      ],
      imports: [LoginView],
    });
    fixture = TestBed.createComponent(LoginView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
