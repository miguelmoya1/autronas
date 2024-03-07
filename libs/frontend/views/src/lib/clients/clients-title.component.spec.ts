import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientsTitleComponent } from './clients-title.component';

describe('ClientsTitleComponent', () => {
  let component: ClientsTitleComponent;
  let fixture: ComponentFixture<ClientsTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsTitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
