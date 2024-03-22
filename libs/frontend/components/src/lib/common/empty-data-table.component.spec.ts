import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreService } from '@autronas/frontend/store';
import { EmptyDataTableComponent } from './empty-data-table.component';

jest.mock('@autronas/frontend/store');

describe('EmptyDataTableComponent', () => {
  let component: EmptyDataTableComponent;
  let fixture: ComponentFixture<EmptyDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyDataTableComponent],
      providers: [StoreService],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
