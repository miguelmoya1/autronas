import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarView } from './toolbar.view';

describe('ToolbarView', () => {
  let component: ToolbarView;
  let fixture: ComponentFixture<ToolbarView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarView],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
