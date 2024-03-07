import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthDtoService } from '@autronas/frontend/actions';
import { AuthService, UserService } from '@autronas/frontend/services';
import { StoreService } from '@autronas/frontend/store';
import { AppPage } from './app.page';

jest.mock('@autronas/frontend/store');
jest.mock('@autronas/frontend/actions');
jest.mock('@autronas/frontend/services');

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPage, RouterTestingModule, NoopAnimationsModule],
      providers: [AuthService, StoreService, AuthDtoService, UserService],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
