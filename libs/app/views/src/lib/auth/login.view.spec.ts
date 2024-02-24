import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthDtoService } from '@autronas/app/actions';
import { StoreService } from '@autronas/app/store';
import { LoginView } from './login.view';

jest.mock('@autronas/app/store');
jest.mock('@autronas/app/actions');

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
