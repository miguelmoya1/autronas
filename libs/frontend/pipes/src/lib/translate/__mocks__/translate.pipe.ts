import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false, // no pure to detect changes
})
export class TranslatePipe implements PipeTransform {
  transform(value: unknown, params: unknown) {
    return `translated ${value}, params: ${JSON.stringify(params)}`;
  }
}
