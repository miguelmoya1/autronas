import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { ClientsDtoService } from '@autronas/frontend/actions';
import { StoreService } from '@autronas/frontend/store';
import { ClientsEditPage } from './clients-edit.page';

jest.mock('@autronas/frontend/store');
jest.mock('@autronas/frontend/actions');

describe('ClientsEditPage', () => {
  let component: ClientsEditPage;
  let fixture: ComponentFixture<ClientsEditPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsEditPage, NoopAnimationsModule],
      providers: [
        StoreService,
        ClientsDtoService,
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

    fixture = TestBed.createComponent(ClientsEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
