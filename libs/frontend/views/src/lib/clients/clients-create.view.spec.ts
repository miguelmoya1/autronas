import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientsCreateView } from './clients-create.view';

describe('ClientsCreateView', () => {
  let component: ClientsCreateView;
  let fixture: ComponentFixture<ClientsCreateView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsCreateView],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsCreateView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
