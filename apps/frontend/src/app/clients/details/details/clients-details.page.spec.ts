import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '@autronas/frontend/store';
import { ClientsDetailsPage } from './clients-details.page';

jest.mock('@autronas/frontend/store');

describe('ClientsDetailPage', () => {
  let component: ClientsDetailsPage;
  let fixture: ComponentFixture<ClientsDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsDetailsPage],
      providers: [
        StoreService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: 1,
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
