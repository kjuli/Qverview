import {Component, OnInit} from '@angular/core';
import { QuantumExecutionResourceService } from '../quantum-execution-resource.service';
import { MatTableDataSource } from '@angular/material/table';
import { FilterService } from '../../filter/filter.service';
import {BaseTableModel} from '../../generictable/table.model';
import {QuantumExecutionResource} from '../quantum-execution-resource.model';

@Component({
  selector: 'app-quantum-computation-resources-table',
  templateUrl: './quantum-execution-resources-table.component.html',
  styleUrls: ['../../app.component.scss', './quantum-execution-resources-table.component.scss']
})
export class QuantumExecutionResourcesTableComponent implements OnInit {

  dataSource;
  qerTableModel: QerTableModel;

  constructor(private quantumExecutionResourceService: QuantumExecutionResourceService, private filterService: FilterService) {
  }

  ngOnInit(): void {
    this.qerTableModel = new QerTableModel(this.quantumExecutionResourceService);
    this.qerTableModel.connectToFilterService(this.filterService.qerFilterEvent$, this.filterService.searchEvent$, this.filterService.showQERTable);

    // this.filterService.qerFilterEvent$.subscribe(qer => {
    //   this.dataSource = new MatTableDataSource(qer);
    //   this.qerTableModel.dataSource.next(this.dataSource);
    // });
    //
    // this.filterService.searchEvent$.subscribe(value => {
    //   this.dataSource.filter = value;
    // });
    //
    // this.filterService.showQERTable.subscribe(value => {
    //   this.qerTableModel.hideTable.next(!value);
    // });
  }

  nameClicked(name: string): void {
    // this.filterService.toggleQuantumExecutionResource(name);
  }

  typeClicked(type: string): void {
    // this.filterService.toggleResourceType(type);
  }

  computationModelClicked(computationModel: string): void {
    // this.filterService.toggleComputationModel(computationModel);
  }

  vendorClicked(vendor: string): void {
    // this.filterService.toggleVendor(vendor);
  }

}

class QerTableModel extends BaseTableModel<QuantumExecutionResource> {
  columns = [
    {name: 'name', label: 'Quantum Execution Resources'},
    {name: 'executionType', filterValue: 'executionTypes'},
    {name: 'computationModel', filterValue: 'computationModels'},
    {name: 'vendor', filterValue: 'vendors'}
  ];
}
