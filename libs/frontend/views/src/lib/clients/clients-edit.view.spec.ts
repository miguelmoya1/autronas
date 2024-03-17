import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientsEditView } from './clients-edit.view';

describe('ClientsEditView', () => {
  let component: ClientsEditView;
  let fixture: ComponentFixture<ClientsEditView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsEditView],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsEditView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
