import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreService } from '@autronas/frontend/store';
import { ToolbarView } from './toolbar.view';

jest.mock('@autronas/frontend/store');

describe('ToolbarView', () => {
  let component: ToolbarView;
  let fixture: ComponentFixture<ToolbarView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarView],
      providers: [StoreService],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
