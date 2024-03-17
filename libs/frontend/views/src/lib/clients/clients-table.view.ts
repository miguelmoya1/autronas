import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatHeaderRow, MatRow, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Client, Paginator } from '@autronas/core/interfaces';
import { EmptyDataTableComponent } from '@autronas/frontend/components';
import { TABLE_KEYS, TableBaseComponent, defaultTableData } from '@autronas/frontend/helpers';
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

          <ng-container matColumnDef="surname">
            <mat-header-cell *matHeaderCellDef mat-sort-header>
              {{ 'SURNAME' | translate }}
            </mat-header-cell>

            <mat-cell *matCellDef="let element"> {{ element.surname }} </mat-cell>
          </ng-container>

          <ng-container matColumnDef="email">
            <mat-header-cell *matHeaderCellDef mat-sort-header>
              {{ 'EMAIL' | translate }}
            </mat-header-cell>

            <mat-cell *matCellDef="let element"> {{ element.email }} </mat-cell>
          </ng-container>

          <ng-container matColumnDef="personalID">
            <mat-header-cell *matHeaderCellDef mat-sort-header>
              {{ 'PERSONAL_ID' | translate }}
            </mat-header-cell>

            <mat-cell *matCellDef="let element"> {{ element.personalID }} </mat-cell>
          </ng-container>

          <ng-container matColumnDef="phoneNumber">
            <mat-header-cell *matHeaderCellDef mat-sort-header>
              {{ 'PHONE_NUMBER' | translate }}
            </mat-header-cell>

            <mat-cell *matCellDef="let element"> {{ element.phoneNumber }} </mat-cell>
          </ng-container>

          <ng-container matColumnDef="isBusiness">
            <mat-header-cell *matHeaderCellDef mat-sort-header>
              {{ 'IS_BUSINESS' | translate }}
            </mat-header-cell>

            <mat-cell *matCellDef="let element" style="display: flex; align-items: center; justify-content: center">
              @if (element.isBusiness) {
                <mat-icon>check</mat-icon>
              } @else {
                <mat-icon>close</mat-icon>
              }
            </mat-cell>
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
          <mat-row *matRowDef="let row; columns: headers()" [routerLink]="['/clients', row.id]" />
        </mat-table>

        @if (clients().loading) {
          <mat-progress-bar mode="indeterminate" />
        }

        @if (!data().data.length) {
          <autronas-empty-data-table />
        }

        <mat-paginator [length]="data().count" [pageSizeOptions]="[5, 10, 25]" />
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
    RouterLink,
  ],
  styles: `
    :host {
      display: block;
    }

    mat-card {
      cursor: pointer;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsTableView extends TableBaseComponent<Client> implements OnInit {
  private readonly _store = inject(StoreService);

  protected readonly clients = this._store.get(STORE_KEYS.ALL_CLIENTS_PAGINATED);

  protected override readonly storeKey = TABLE_KEYS.CLIENTS;
  protected override readonly headers = this._store.get(STORE_KEYS.CLIENT_TABLE_HEADERS);
  protected override readonly data = computed(() => defaultTableData(this.clients().data));

  protected override async fetchMore(data: Paginator) {
    this._store.set(STORE_KEYS.CLIENTS_PAGINATOR, data);
  }

  public ngOnInit() {
    const paginator = this._store.get(STORE_KEYS.CLIENTS_PAGINATOR);

    this.setPaginator(paginator());
  }
}
