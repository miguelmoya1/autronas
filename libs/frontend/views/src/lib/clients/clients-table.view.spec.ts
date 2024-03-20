import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreService } from '@autronas/frontend/store';
import { ClientsTableView } from './clients-table.view';

jest.mock('@autronas/frontend/store');

describe('ClientsTableView', () => {
  let component: ClientsTableView;
  let fixture: ComponentFixture<ClientsTableView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsTableView, NoopAnimationsModule],
      providers: [StoreService],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsTableView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
