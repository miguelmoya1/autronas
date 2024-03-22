import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreService } from '@autronas/frontend/store';
import { ClientsConfigPage } from './clients-config.page';

jest.mock('@autronas/frontend/store');

describe('ClientsConfigPage', () => {
  let component: ClientsConfigPage;
  let fixture: ComponentFixture<ClientsConfigPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsConfigPage],
      providers: [StoreService],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsConfigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
