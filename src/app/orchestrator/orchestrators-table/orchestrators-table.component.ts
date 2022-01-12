import {Component, OnInit} from '@angular/core';
import { OrchestratorService } from '../orchestrator.service';
import { MatTableDataSource } from '@angular/material/table';
import { Orchestrator } from '../orchestrator.model';
import { FilterService } from '../../filter/filter.service';
import {BaseTableModel} from '../../generictable/table.model';

@Component({
  selector: 'app-orchestrators-table',
  templateUrl: './orchestrators-table.component.html',
  styleUrls: ['../../app.component.scss', './orchestrators-table.component.scss']
})
export class OrchestratorsTableComponent implements OnInit {

  dataSource;
  oTableModel: OTableModel;

  constructor(private orchestratorService: OrchestratorService, private filterService: FilterService) {
  }

  ngOnInit(): void {
    this.oTableModel = new OTableModel(this.orchestratorService);
    this.oTableModel.connectToFilterService(this.filterService.orchestratorFilterEvent$, this.filterService.searchEvent$, this.filterService.showOTable);
    // this.dataSource = new MatTableDataSource<Orchestrator>(this.orchestratorService.orchestrators);
    // this.oTableModel = new OTableModel(this.dataSource);
    //
    // this.filterService.orchestratorFilterEvent$.subscribe(filter => {
    //   this.dataSource = new MatTableDataSource(filter);
    //   this.oTableModel.dataSource.next(this.dataSource);
    // });
    //
    // this.filterService.searchEvent$.subscribe(value => {
    //   this.dataSource.filter = value;
    // });
    //
    // this.filterService.showOTable.subscribe(value => this.oTableModel.hideTable.next(!value));
  }

}

class OTableModel extends BaseTableModel<Orchestrator> {
  columns = [
    {name: 'name', label: 'Orchestrator'},
    {name: 'licenses'},
    {name: 'programmingLanguages'},
    {name: 'activeDevelopment'},
    {name: 'productionReady'}
  ];
}
