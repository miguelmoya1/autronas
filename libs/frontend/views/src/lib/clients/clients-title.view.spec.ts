import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientsTitleView } from './clients-title.view';

describe('ClientsTitleView', () => {
  let component: ClientsTitleView;
  let fixture: ComponentFixture<ClientsTitleView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsTitleView],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsTitleView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
