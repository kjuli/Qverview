import {Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProgrammingLanguageService } from '../programming-language.service';
import { ProgrammingLanguage } from '../programming-language.model';
import { FilterService } from '../../filter/filter.service';
import {BaseTableModel} from '../../generictable/table.model';

@Component({
  selector: 'app-programming-language-table',
  templateUrl: './programming-language-table.component.html',
  styleUrls: ['../../app.component.scss', './programming-language-table.component.scss']
})
export class ProgrammingLanguageTableComponent implements OnInit {

  dataSource;
  plTableModel: PlTableModel;

  constructor(private programmingLanguageService: ProgrammingLanguageService, private filterService: FilterService) { }

  ngOnInit(): void {
    this.plTableModel = new PlTableModel(this.programmingLanguageService);
    this.plTableModel.connectToFilterService(this.filterService.qplFilterEvent$, this.filterService.searchEvent$, this.filterService.showPLTable);
    // this.dataSource = new MatTableDataSource<ProgrammingLanguage>(this.programmingLanguageService.programmingLanguages);
    // this.plTableModel = new PlTableModel(this.dataSource);
    //
    // this.filterService.qplFilterEvent$.subscribe(filter => {
    //   this.dataSource = new MatTableDataSource(filter);
    //   this.plTableModel.dataSource.next(this.dataSource);
    // });
    //
    // this.filterService.searchEvent$.subscribe(value => {
    //   this.dataSource.filter = value;
    // });
    //
    // this.filterService.showPLTable.subscribe(value => this.plTableModel.hideTable.next(!value));
  }

  nameClicked(name: string): void {
    // this.filterService.toggleProgrammingLanguage(name);
  }

  typeClicked(type: string): void {
    // this.filterService.toggleLanguageType(type);
  }

  syntaxImplementationClicked(syntaxImplementation: string): void {
    // this.filterService.toggleSyntaxImplementation(syntaxImplementation);
  }

  standardizationClicked(standardization: string): void {
    // this.filterService.toggleStandardization(standardization);
  }
}

class PlTableModel extends BaseTableModel<ProgrammingLanguage> {
  columns = [
    {name: 'name', label: 'Programming Languages'},
    {name: 'type', filterValue: 'qplTypes'},
    {name: 'syntaxImplementation', filterValue: 'qplSyntaxImplementations'},
    {name: 'standardization', filterValue: 'qplStandardizations'}
  ];
}
