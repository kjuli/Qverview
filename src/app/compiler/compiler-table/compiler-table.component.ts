import {Component, OnInit} from '@angular/core';
import { CompilerService } from '../compiler.service';
import { MatTableDataSource } from '@angular/material/table';
import { FilterService } from '../../filter/filter.service';
import { Compiler } from '../compiler.model';
import {BaseTableModel} from '../../generictable/table.model';

@Component({
  selector: 'app-compiler-table',
  templateUrl: './compiler-table.component.html',
  styleUrls: ['../../app.component.scss', './compiler-table.component.scss']
})
export class CompilerTableComponent implements OnInit {

  dataSource;
  compilerTableModel: CompilerTableModel;

  constructor(private compilerService: CompilerService, private filterService: FilterService) { }

  ngOnInit(): void {
    this.compilerTableModel = new CompilerTableModel(this.compilerService);
    this.compilerTableModel.connectToFilterService(this.filterService.compilerFilterEvent$, this.filterService.searchEvent$, this.filterService.showCompilerTable);

    // this.dataSource = new MatTableDataSource<Compiler>(this.compilerService.compilers);
    // this.compilerTableModel = new CompilerTableModel(this.dataSource);
    //
    // this.filterService.compilerFilterEvent$.subscribe(filter => {
    //   this.dataSource = new MatTableDataSource(filter);
    //   this.compilerTableModel.dataSource.next(this.dataSource);
    // });
    //
    // this.filterService.searchEvent$.subscribe(value => {
    //   this.dataSource.filter = value;
    // });
    //
    // this.filterService.showCompilerTable.subscribe(value => this.compilerTableModel.hideTable.next(!value));
  }

}

class CompilerTableModel extends BaseTableModel<Compiler> {
  columns = [
    {name: 'name', label: 'Compiler'},
    {name: 'inputLanguages', filterValue: 'compilerInputLanguages'},
    {name: 'outputLanguages', filterValue: 'compilerOutputLanguages'},
    {name: 'optimizationStrategies', filterValue: 'compilerOptimizationStrategies'}
  ];
}
