import { input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@sleep-valley/app/services';
import { User } from '@sleep-valley/core/interfaces';
import { GameCardRequestComponent } from './game-card-request.component';

jest.mock('@sleep-valley/app/services');

describe('GameCardRequestComponent', () => {
  let component: GameCardRequestComponent;
  let fixture: ComponentFixture<GameCardRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GameCardRequestComponent],
      providers: [TranslateService],
    });
    fixture = TestBed.createComponent(GameCardRequestComponent);
    component = fixture.componentInstance;

    // fixture.componentRef.setInput('user', {
    //   name: 'Test User',
    //   surname: 'Test Surname',
    // });

    component.user = input({
      name: 'Test User',
      surname: 'Test Surname',
    } as User);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
