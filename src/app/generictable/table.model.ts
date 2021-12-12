import {BehaviorSubject, Subject} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';

/**
 * This interface defines the model of a table. The model
 * contains information about the table's columns, whether
 * it should be displayed or not and its content.
 * @param <M> The type of the table content.
 */
export interface TableModel<M> {
  /** Variable specifying whether the table should be displayed. */
  hideTable: Subject<boolean>;
  /** The data source for the table (contains the data). */
  dataSource: Subject<MatTableDataSource<M>>;
  /** The columns of the table. */
  columns: ColumnDefinition[];

  /**
   * Converts the specific cell given by the row and column into a
   * displayable string. This returned string will be displayed in
   * the actual table.
   * @param row The row of the cell.
   * @param column The column of the cell.
   * @return A displayable string for the table.
   */
  onCell(row: M, column: ColumnDefinition): string;
}

/**
 * Interface defining the column. It has a identifiable name and
 * optionally a label. The label will be displayed in the table
 * if provided. Otherwise, the name will be given.
 */
export interface ColumnDefinition {
  name: string;
  label?: string;
}

/**
 * A base implementation of the {@link TableModel}. It already
 * sets the hideTable initially to {@code false}. The dataSource
 * is given by the constructor.
 */
export abstract class BaseTableModel<M> implements TableModel<M> {
  hideTable = new BehaviorSubject<boolean>(false);
  dataSource;
  abstract columns;

  constructor(initialValue: MatTableDataSource<M>) {
    this.dataSource = new BehaviorSubject(initialValue);
  }

  /**
   * A base implementation of the cell. If the cell's type is an array,
   * then each element will be wrapped by a {@code <div>}. Otherwise, the
   * value is simply returned as a string.
   * @param row The row of the cell.
   * @param column The column of the cell.
   * @return a displayable string for the table cell.
   */
  onCell(row: M, column: ColumnDefinition): string {
    if (Array.isArray(row[column.name])) {
      return row[column.name].map(value => '<div class="element-in-table">' + value + '</div>').join('\n');
    }
    return row[column.name];
  }
}
