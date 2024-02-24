import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { SidenavButtonComponent } from './sidenav-button.component';

describe('SidenavButtonComponent', () => {
  let component: SidenavButtonComponent;
  let fixture: ComponentFixture<SidenavButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
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
