import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatHeaderRow, MatRow, MatTableModule } from '@angular/material/table';
import { Client, Paginator } from '@autronas/core/interfaces';
import { EmptyDataTableComponent } from '@autronas/frontend/components';
import {
  TableBaseComponent,
  defaultTableData,
} from '@autronas/frontend/helpers';
import { TranslatePipe } from '@autronas/frontend/pipes';
import { STORE_KEYS, StoreService } from '@autronas/frontend/store';

@Component({
  selector: 'autronas-clients-table-view',
  standalone: true,
  template: `
    <mat-card appearance="outlined">
      <mat-card-content>
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
          <autronas-empty-data-table />
        }

        <mat-paginator
          [length]="data().count"
          [pageSizeOptions]="[5, 10, 25]"
        />
      </mat-card-content>
    </mat-card>
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
    EmptyDataTableComponent,
    MatCard,
    MatCardContent,
  ],
  styles: `
    :host {
      display: block;
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

  protected readonly data = computed(() =>
    defaultTableData(this.clients().data),
  );

  protected async fetchMore(data: Paginator) {
    this._store.set(STORE_KEYS.CLIENTS_PAGINATOR, data);
  }
}
