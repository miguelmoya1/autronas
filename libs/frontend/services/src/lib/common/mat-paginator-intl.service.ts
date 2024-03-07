import { Injectable, effect, inject } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { STORE_KEYS, StoreService } from '@autronas/frontend/store';

@Injectable({
  providedIn: 'root',
})
export class MatPaginatorIntlService extends MatPaginatorIntl {
  private readonly _store = inject(StoreService);

  constructor() {
    super();

    effect(() => {
      const translate = this._store.get(STORE_KEYS.TRANSLATE)();

      this.itemsPerPageLabel =
        translate.data?.['ITEMS_PER_PAGE'] || 'Items per page:';
      this.nextPageLabel = translate.data?.['NEXT_PAGE'] || 'Next page';
      this.previousPageLabel =
        translate.data?.['PREVIOUS_PAGE'] || 'Previous page';
      this.changes.next();
    });
  }

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 / ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} / ${length}`;
  };
}
