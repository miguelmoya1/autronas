import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientsDetailsPage } from './clients-details.page';

describe('ClientsDetailPage', () => {
  let component: ClientsDetailsPage;
  let fixture: ComponentFixture<ClientsDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsDetailsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
