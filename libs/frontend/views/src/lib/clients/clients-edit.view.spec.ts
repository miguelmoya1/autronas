import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { ClientsDtoService } from '@autronas/frontend/actions';
import { StoreService } from '@autronas/frontend/store';
import { ClientsEditView } from './clients-edit.view';

jest.mock('@autronas/frontend/actions');
jest.mock('@autronas/frontend/store');

describe('ClientsEditView', () => {
  let component: ClientsEditView;
  let fixture: ComponentFixture<ClientsEditView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsEditView, NoopAnimationsModule],
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

    fixture = TestBed.createComponent(ClientsEditView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
