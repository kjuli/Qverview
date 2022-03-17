import {BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {Entity, NameRepository} from '../common/repository';
import {FilterService} from '../filter/filter.service';

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

}

/**
 * Interface defining the column. It has a identifiable name and
 * optionally a label. The label will be displayed in the table
 * if provided. Otherwise, the name will be given.
 */
export interface ColumnDefinition {
  name: string;
  label?: string;
  colorCode?: string | object;
  filterValue?: string;
}

/**
 * A base implementation of the {@link TableModel}. It already
 * sets the hideTable initially to {@code false}. The dataSource
 * is given by the constructor.
 */
export abstract class BaseTableModel<M extends Entity> implements TableModel<M> {
  hideTable = new BehaviorSubject<boolean>(false);
  dataSource = new ReplaySubject<MatTableDataSource<M>>();
  currentDatasource: MatTableDataSource<M>;
  abstract columns;

  private readonly subscriber = {
    next: next => {
      this.currentDatasource = new MatTableDataSource<M>(next);
      this.dataSource.next(this.currentDatasource);
    },
    error: error => console.error('An error occurred during subscribing repository in table: ' + error),
    complete: () => console.debug('Table build completed')
  };

  constructor(repository: NameRepository<M>) {
    repository.asObservable().subscribe(this.subscriber);
  }

  /**
   * A base implementation of the cell. If the cell's type is an array,
   * then each element will be wrapped by a {@code <div>}. Otherwise, the
   * value is simply returned as a string.
   * @param row The row of the cell.
   * @param column The column of the cell.
   * @return a displayable string for the table cell.
   */
  public onCell(row: M, column: ColumnDefinition): string {
    if (Array.isArray(row[column.name])) {
      if (row[column.name].length > 0) {
        return row[column.name].map(value => BaseTableModel.resolveReference(value)).join('<br/>\n');
      } else {
        return '-- none --';
      }
    }
    return BaseTableModel.resolveReference(row[column.name]);
  }

  public connectToFilterService(filterEvent: Observable<M[]>, searchEvent: Observable<string>, showEvent: Observable<boolean>) {
    filterEvent.subscribe(this.subscriber);
    searchEvent.subscribe(search => this.currentDatasource.filter = search);
    showEvent.subscribe(negate(this.hideTable));
  }

  private static resolveReference(obj: any): string {
    if (obj instanceof Entity && !obj.isUndefined) {
        return `<a href="#${obj.toString().trim()}" class="reference">${obj}</a>`;
    }
    return obj;
  }
}


function negate(s: Subject<boolean>): (value: boolean) => void {
  return value => s.next(!value);
}
