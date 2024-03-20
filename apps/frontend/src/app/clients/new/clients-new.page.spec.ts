import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '@autronas/frontend/store';
import { ClientsPage } from '../all/clients.page';

jest.mock('@autronas/frontend/store');

describe('ClientsPage', () => {
  let component: ClientsPage;
  let fixture: ComponentFixture<ClientsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsPage, NoopAnimationsModule],
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

    fixture = TestBed.createComponent(ClientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
