import {
  AfterViewInit,
  Component,
  DestroyRef,
  OnInit,
  Signal,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Paginated, Paginator } from '@autronas/core/interfaces';
import { merge } from 'rxjs';

@Component({
  selector: 'autronas-table',
  template: '',
})
export abstract class TableBaseComponent<T = unknown>
  implements OnInit, AfterViewInit
{
  protected abstract readonly headers: Signal<string[]>;
  protected abstract readonly data: Signal<Paginated<T>>;
  protected abstract fetchMore(data: Paginator): Promise<void>;

  private readonly _destroyRef = inject(DestroyRef);

  protected readonly dataSource = new MatTableDataSource<T>([]);

  @ViewChild(MatPaginator) protected declare paginator: MatPaginator;
  @ViewChild(MatSort) protected declare sort: MatSort;

  constructor() {
    effect(() => {
      this.dataSource.data = this.data().data;
    });
  }

  async ngOnInit() {
    this.dataSource.data = this.data().data;
  }

  ngAfterViewInit() {
    this.paginator.pageSize = 10;

    // reset the paginator after sorting
    this.sort.sortChange
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => (this.paginator.pageIndex = 0));

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => this.loadData());
  }

  private async loadData() {
    const data: Paginator = {
      limit: this.paginator.pageSize,
      offset: this.paginator.pageIndex * this.paginator.pageSize,
    };

    if (this.sort.active) {
      data['sort'] = this.sort.active;
      data['direction'] = this.sort.direction === 'asc' ? 'ASC' : 'DESC';
    }

    await this.fetchMore(data);
  }
}
