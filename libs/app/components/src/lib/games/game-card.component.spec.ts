import { input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@sleep-valley/app/services';
import { Game } from '@sleep-valley/core/interfaces';
import { GameCardComponent } from './game-card.component';

jest.mock('@sleep-valley/app/services');

describe('GameCardComponent', () => {
  let component: GameCardComponent;
  let fixture: ComponentFixture<GameCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GameCardComponent],
      providers: [TranslateService],
    });
    fixture = TestBed.createComponent(GameCardComponent);
    component = fixture.componentInstance;

    // fixture.componentRef.setInput('game', {
    //   name: 'Test Game',
    //   code: 'test-game',
    // } as Game);

    component.game = input({
      name: 'Test Game',
      code: 'test-game',
    } as Game);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
