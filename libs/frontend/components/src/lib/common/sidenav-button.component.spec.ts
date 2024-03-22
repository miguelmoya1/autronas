import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '@autronas/frontend/store';
import { SidenavButtonComponent } from './sidenav-button.component';

jest.mock('@autronas/frontend/store');

describe('SidenavButtonComponent', () => {
  let component: SidenavButtonComponent;
  let fixture: ComponentFixture<SidenavButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        StoreService,
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
      imports: [SidenavButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavButtonComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('open', true);
    fixture.componentRef.setInput('icon', 'icon');
    fixture.componentRef.setInput('label', 'label');
    fixture.componentRef.setInput('routerLink', ['routerLink']);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
