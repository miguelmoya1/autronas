import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreService } from '@autronas/frontend/store';
import { UserConfigView } from './user-config.view';

jest.mock('@autronas/frontend/store');

describe('UserConfigView', () => {
  let component: UserConfigView;
  let fixture: ComponentFixture<UserConfigView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserConfigView],
      providers: [StoreService],
    }).compileComponents();

    fixture = TestBed.createComponent(UserConfigView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
