import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientsDetailsView } from './clients-details.view';

describe('ClientsDetailsComponent', () => {
  let component: ClientsDetailsView;
  let fixture: ComponentFixture<ClientsDetailsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsDetailsView],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsDetailsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
