import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ColumnDefinition, TableModel} from './table.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {AppConfigService} from '../config/app-config.service';

/**
 * This component is a generic table that all data about Quantum services, SDKs, etc.
 * share. The information about the table and its data is given by a {@link TableModel}.
 *
 * Each Table has a paginator. The column will be displayed by the given name in {@link ColumnDefinition}
 * if the label wasn't explicitly given. If the name is in camelCase, then it will be converted
 * into a sentenced string ({@link #convertCamelCaseToSentence}).
 *
 * When a cell is going to be displayed, then {@link TableModel#onCell} will be called and the
 * returned string is displayed.
 */
@Component({
  selector: 'app-quantum-table',
  templateUrl: './table.component.html',
  styleUrls: ['../app.component.scss', 'table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {

  /** The information about the table and its data. */
  @Input() tableDefinition: TableModel<any>;

  /** An array of options about how many rows should be displayed at once. */
  @Input() pageSizeOptions = [5, 10, 20];

  /** The actual data received by the {@link #tableDefinition} */
  dataSource: MatTableDataSource<any>;
  /** Hides the table when true. */
  hideTable: boolean;
  /** The column names received by {@link #tableDefinition} */
  columnNames: string[];

  @ViewChild('paginator') paginator: MatPaginator;


  ngOnInit(): void {
    this.tableDefinition.dataSource.subscribe(value => {
      this.dataSource = value;
      this.dataSource.paginator = this.paginator;
    });
    this.tableDefinition.hideTable.subscribe(value => this.hideTable = value);
    this.columnNames = this.tableDefinition.columns.map(value => value.name);
  }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  /**
   * Converts a string that is in camelCase to a sentenced string. For example,
   * {@code "thisExample"} will be converted to {@code "This Example"}.
   * @param input The string to convert to. Should be in camelCase.
   * @return a sentenced-based string.
   */
  convertCamelCaseToSentence(input: string): string {
    const result = input.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  isArray(a: any): boolean {
    return Array.isArray(a);
  }

  getColorCodeFromColumn(row, column: ColumnDefinition): string | undefined {
    const color = AppConfigService.settings.colors[column.name];
    return color;
  }

  onlyIfName(columnName: string, link?: string): string | undefined {
    if (columnName === 'name') {
      return link;
    }
    return undefined;
  }
}
