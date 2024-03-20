import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '@autronas/frontend/store';
import { ClientsTitleView } from './clients-title.view';

jest.mock('@autronas/frontend/store');

describe('ClientsTitleView', () => {
  let component: ClientsTitleView;
  let fixture: ComponentFixture<ClientsTitleView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsTitleView],
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

    fixture = TestBed.createComponent(ClientsTitleView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
