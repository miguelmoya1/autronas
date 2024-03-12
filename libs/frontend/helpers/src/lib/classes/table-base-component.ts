import { Component, DestroyRef, Signal, effect, inject, untracked, viewChild } from '@angular/core';
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
export abstract class TableBaseComponent<T = unknown> {
  protected abstract readonly tableName: string;
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

    effect(async () => {
      const paginator = this.paginator();
      const sort = this.sort();

      const { value } = await Preferences.get({ key: `itemPerPage-${this.tableName}` });
      paginator.pageSize = parseInt(value || '10', 10);

      // set the paginator page size based on the user's preference
      paginator.page.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((p) => {
        Preferences.set({ key: `itemPerPage-${this.tableName}`, value: p.pageSize.toString() });
      });

      // reset the paginator after sorting
      sort.sortChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => (paginator.pageIndex = 0));

      // on sort or paginate events, load a new page
      merge(sort.sortChange, paginator.page)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.loadData());

      // load the first page
      untracked(() => {
        this.loadData();
      });
    });
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
      data['direction'] = sort.direction === 'asc' ? 'ASC' : 'DESC';
    }

    await this.fetchMore(data);
  }
}
