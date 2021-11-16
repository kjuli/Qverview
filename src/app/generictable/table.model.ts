import {BehaviorSubject, Subject} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';

export interface TableModel<M> {
  hideTable: Subject<boolean>;
  dataSource: Subject<MatTableDataSource<M>>;
  columns: ColumnDefinition[];

  onCell(row: M, column: ColumnDefinition): string;
}

export interface ColumnDefinition {
  name: string;
  label?: string;
}

export abstract class BaseTableModel<M> implements TableModel<M> {
  hideTable = new BehaviorSubject<boolean>(false);
  dataSource;
  abstract columns;

  constructor(initialValue: MatTableDataSource<M>) {
    this.dataSource = new BehaviorSubject(initialValue);
  }

  onCell(row: M, column: ColumnDefinition): string {
    if (Array.isArray(row[column.name])) {
      return row[column.name].map(value => '<div class="element-in-table">' + value + '</div>').join('');
    }
    return row[column.name];
  }
}
