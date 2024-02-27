import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '@autronas/app/store';
import { SidenavView } from './sidenav.view';

jest.mock('@autronas/app/store');

describe('SidenavView', () => {
  let component: SidenavView;
  let fixture: ComponentFixture<SidenavView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        StoreService,
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
      imports: [SidenavView, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
