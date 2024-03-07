import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatHeaderRow, MatRow, MatTableModule } from '@angular/material/table';
import { Client, Paginator } from '@autronas/core/interfaces';
import { TableBaseComponent } from '@autronas/frontend/helpers';
import { TranslatePipe } from '@autronas/frontend/pipes';
import { STORE_KEYS, StoreService } from '@autronas/frontend/store';

@Component({
  selector: 'autronas-clients-table-view',
  standalone: true,
  template: `
    <mat-table #table [dataSource]="dataSource" matSort>
      <ng-container matColumnDef="name">
        <mat-header-cell *matHeaderCellDef mat-sort-header>
          {{ 'NAME' | translate }}
        </mat-header-cell>

        <mat-cell *matCellDef="let element"> {{ element.name }} </mat-cell>
      </ng-container>

      <ng-container matColumnDef="createdAt">
        <mat-header-cell *matHeaderCellDef mat-sort-header>
          {{ 'CREATED_AT' | translate }}
        </mat-header-cell>

        <mat-cell *matCellDef="let element">
          {{ element.createdAt | date: 'dd/MM/yyyy' }}
        </mat-cell>
      </ng-container>

      <mat-header-row *matHeaderRowDef="headers()" />
      <mat-row *matRowDef="let row; columns: headers()" />
    </mat-table>

    @if (clients().loading) {
      <mat-progress-bar mode="indeterminate" />
    }

    @if (!data().data.length) {
      <h3 class="no-data">
        {{ 'NO_DATA' | translate }}
      </h3>
    }

    <mat-paginator [length]="data().count" [pageSizeOptions]="[5, 10, 25]" />
  `,
  imports: [
    MatTableModule,
    MatSortModule,
    MatProgressBar,
    MatIcon,
    TranslatePipe,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    DatePipe,
  ],
  styles: `
    :host {
      display: block;
    }

    .no-data {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;

      padding: 16px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsTableView extends TableBaseComponent<Client> {
  private readonly _store = inject(StoreService);
  protected readonly headers = signal(['name', 'createdAt']);
  protected readonly clients = this._store.get(
    STORE_KEYS.ALL_CLIENTS_PAGINATED,
  );

  protected readonly data = computed(
    () =>
      this.clients().data ?? {
        count: 0,
        data: [],
        hasNext: false,
        hasPrevious: false,
      },
  );

  protected async fetchMore(data: Paginator) {
    this._store.set(STORE_KEYS.CLIENTS_PAGINATOR, data);
  }
}
