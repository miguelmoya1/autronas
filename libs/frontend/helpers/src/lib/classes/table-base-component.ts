import { AfterViewInit, Component, DestroyRef, Signal, effect, inject, untracked, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Paginated, Paginator } from '@autronas/core/interfaces';
import { Preferences } from '@capacitor/preferences';
import { merge } from 'rxjs';

@Component({
  selector: 'autronas-table',
  template: '',
})
export abstract class TableBaseComponent<T = unknown> implements AfterViewInit {
  protected abstract readonly storeKey: string;
  protected abstract readonly headers: Signal<string[]>;
  protected abstract readonly data: Signal<Paginated<T>>;
  protected abstract fetchMore(data: Paginator): Promise<void>;

  protected readonly dataSource = new MatTableDataSource<T>([]);
  protected readonly paginator = viewChild.required(MatPaginator);
  protected readonly sort = viewChild.required(MatSort);

  protected readonly destroyRef = inject(DestroyRef);

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

    Preferences.set({ key: this.storeKey, value: JSON.stringify(data) });

    await this.fetchMore(data);
  }

  public setPaginator(paginator: Paginator) {
    this.paginator().pageSize = paginator.limit;
    this.paginator().pageIndex = paginator.offset / paginator.limit;

    this.sort().active = paginator.sort || '';
    this.sort().direction = paginator.direction || 'asc';
  }
}
