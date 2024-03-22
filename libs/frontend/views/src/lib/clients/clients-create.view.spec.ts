import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { ClientsDtoService } from '@autronas/frontend/actions';
import { StoreService } from '@autronas/frontend/store';
import { ClientsCreateView } from './clients-create.view';

jest.mock('@autronas/frontend/actions');
jest.mock('@autronas/frontend/store');

describe('ClientsCreateView', () => {
  let component: ClientsCreateView;
  let fixture: ComponentFixture<ClientsCreateView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsCreateView, NoopAnimationsModule],
      providers: [
        ClientsDtoService,
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

    fixture = TestBed.createComponent(ClientsCreateView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
