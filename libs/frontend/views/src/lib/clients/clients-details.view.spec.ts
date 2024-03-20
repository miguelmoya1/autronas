import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '@autronas/frontend/store';
import { ClientsDetailsView } from './clients-details.view';

jest.mock('@autronas/frontend/store');

describe('ClientsDetailsComponent', () => {
  let component: ClientsDetailsView;
  let fixture: ComponentFixture<ClientsDetailsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsDetailsView],
      providers: [
        StoreService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsDetailsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
