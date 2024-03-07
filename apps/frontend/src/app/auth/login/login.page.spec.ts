import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthApiService, TranslateService } from '@autronas/frontend/services';
import AuthLoginPage from './login.page';

jest.mock('@autronas/frontend/services');

describe('AuthLoginPage', () => {
  let component: AuthLoginPage;
  let fixture: ComponentFixture<AuthLoginPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslateService, AuthApiService],
      imports: [AuthLoginPage],
    });
    fixture = TestBed.createComponent(AuthLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});