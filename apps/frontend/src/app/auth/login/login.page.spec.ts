import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthDtoService } from '@autronas/frontend/actions';
import { StoreService } from '@autronas/frontend/store';
import AuthLoginPage from './login.page';

jest.mock('@autronas/frontend/actions');
jest.mock('@autronas/frontend/store');

describe('AuthLoginPage', () => {
  let component: AuthLoginPage;
  let fixture: ComponentFixture<AuthLoginPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthLoginPage],
      providers: [AuthDtoService, StoreService],
    });
    fixture = TestBed.createComponent(AuthLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
