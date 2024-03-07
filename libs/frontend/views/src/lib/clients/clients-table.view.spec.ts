import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientsTableView } from './clients-table.view';

describe('ClientsTableView', () => {
  let component: ClientsTableView;
  let fixture: ComponentFixture<ClientsTableView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsTableView],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsTableView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
