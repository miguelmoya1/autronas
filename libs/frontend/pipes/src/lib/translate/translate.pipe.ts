import { Pipe, PipeTransform, inject } from '@angular/core';
import { STORE_KEYS, StoreService } from '@autronas/frontend/store';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false, // no pure to detect changes
})
export class TranslatePipe implements PipeTransform {
  private readonly _store = inject(StoreService);

  transform(value: string, params?: { [key: string]: string }) {
    return this.translate(value, params) ?? value;
  }

  public translate(
    value: string,
    params?: { [key: string]: string | number | boolean },
  ) {
    return (
      this._store
        .get(STORE_KEYS.TRANSLATE)()
        .data?.[value]?.replace(
          /{{\s*([a-zA-Z0-9]+)\s*}}/g,
          (match, key) => `${params?.[key]}` ?? match,
        ) || value
    );
  }
}
