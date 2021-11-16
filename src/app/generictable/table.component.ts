import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {TableModel} from './table.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-quantum-table',
  templateUrl: './table.component.html',
  styleUrls: ['../app.component.scss', 'table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {

  @Input() tableDefinition: TableModel<any>;

  dataSource: MatTableDataSource<any>;
  hideTable: boolean;
  columnNames: string[];

  @Input() pageSizeOptions = [5, 10, 20];
  @ViewChild('paginator') paginator: MatPaginator;


  ngOnInit(): void {
    // this.dataSourceObservable.subscribe(value => {
    //   this.dataSource = value;
    //   this.dataSource.paginator = this.paginator;
    // });
    // this.hideTableObservable.subscribe(value => this.hideTable = value);
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

  convertCamelCaseToSentence(input: string): string {
    const result = input.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }


}
