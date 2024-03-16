import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  output,
  untracked,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Paginated, Paginator } from '@autronas/core/interfaces';
import { TranslatePipe } from '@autronas/frontend/pipes';
import { Preferences } from '@capacitor/preferences';
import { merge } from 'rxjs';

@Component({
  selector: 'autronas-base-table',
  standalone: true,
  templateUrl: './base-table.component.html',
  styleUrl: './base-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTableModule, MatProgressBar, MatPaginator, RouterLink, TranslatePipe, MatSort],
})
export class BaseTableComponent implements AfterViewInit {
  public readonly headers = input.required<string[]>();
  public readonly loading = input.required<boolean>();
  public readonly data = input.required<Paginated<unknown>>();
  public readonly storeKey = input.required<string>();
  public readonly fetchMore = output<Paginator>();

  protected readonly dataSource = new MatTableDataSource<unknown>([]);

  private readonly paginator = viewChild.required(MatPaginator);
  private readonly sort = viewChild.required(MatSort);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      const data = this.data().data;

      untracked(() => {
        this.dataSource.data = data;
      });
    });
  }

  public ngAfterViewInit() {
    const paginator = this.paginator();
    const sort = this.sort();

    // reset the paginator after sorting
    sort.sortChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => (paginator.pageIndex = 0));

    // on sort or paginate events, load a new page
    merge(sort.sortChange, paginator.page)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.loadData());
  }

  private async loadData() {
    const paginator = this.paginator();
    const sort = this.sort();

    const data: Paginator = {
      limit: paginator.pageSize,
      offset: paginator.pageIndex * paginator.pageSize,
    };

    if (sort.active) {
      data['sort'] = sort.active;
    }

    if (sort.direction) {
      data['direction'] = sort.direction;
    }

    Preferences.set({ key: this.storeKey(), value: JSON.stringify(data) });

    this.fetchMore.emit(data);
  }

  public setPaginator(paginator: Paginator) {
    this.paginator().pageSize = paginator.limit;
    this.paginator().pageIndex = paginator.offset / paginator.limit;

    this.sort().active = paginator.sort || '';
    this.sort().direction = paginator.direction || 'asc';
  }
}
