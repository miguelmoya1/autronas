import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@sleep-valley/app/services';
import { CharacterCardComponent } from './character-card.component';

jest.mock('@sleep-valley/app/services');

xdescribe('CharacterCardComponent', () => {
  let component: CharacterCardComponent;
  let fixture: ComponentFixture<CharacterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCardComponent],
      providers: [TranslateService],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
