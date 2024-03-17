import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientsEditPage } from './clients-edit.page';

describe('ClientsEditPage', () => {
  let component: ClientsEditPage;
  let fixture: ComponentFixture<ClientsEditPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsEditPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
