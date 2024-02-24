import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthDtoService } from '@autronas/app/actions';
import { AuthService } from '@autronas/app/services';
import { StoreService } from '@autronas/app/store';
import { AppPage } from './app.page';

jest.mock('@autronas/app/store');
jest.mock('@autronas/app/actions');
jest.mock('@autronas/app/services');

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPage, RouterTestingModule, NoopAnimationsModule],
      providers: [AuthService, StoreService, AuthDtoService],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
