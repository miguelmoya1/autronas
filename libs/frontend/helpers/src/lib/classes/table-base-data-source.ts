import { DataSource } from '@angular/cdk/collections';
import { EffectRef, Injector, Signal, effect } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Paginated } from '@autronas/core/interfaces';
import { BehaviorSubject, map } from 'rxjs';

export class BaseTableDataSource<T> extends DataSource<T> {
  protected readonly dataSubject = new BehaviorSubject<Paginated<T>>({
    count: 0,
    data: [],
    hasNext: false,
    hasPrevious: false,
  });
  protected declare paginator?: MatPaginator;

  set paginatorInstance(paginator: MatPaginator) {
    this.paginator = paginator;
  }

  private declare data: Signal<Paginated<T>>;
  private declare dataEffectRef: EffectRef;

  public setData(data: Signal<Paginated<T>>, injector: Injector) {
    if (!data) {
      return;
    }

    this.data = data;
    if (this.dataEffectRef) {
      this.dataEffectRef.destroy();
    }

    this.dataEffectRef = effect(
      () => {
        this.dataSubject.next(this.data());
      },
      { manualCleanup: true, injector },
    );
  }

  override connect() {
    return this.dataSubject.asObservable().pipe(map((value) => value.data));
  }

  override disconnect() {
    this.dataSubject.complete();
  }
}
