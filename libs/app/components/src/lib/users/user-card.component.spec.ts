import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@sleep-valley/app/services';
import { UserCardComponent } from './user-card.component';

jest.mock('@sleep-valley/app/services');

xdescribe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardComponent],
      providers: [TranslateService],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
