import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterCardLoadingComponent } from './character-card-loading.component';

describe('CharacterCardLoadingComponent', () => {
  let component: CharacterCardLoadingComponent;
  let fixture: ComponentFixture<CharacterCardLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCardLoadingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterCardLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
