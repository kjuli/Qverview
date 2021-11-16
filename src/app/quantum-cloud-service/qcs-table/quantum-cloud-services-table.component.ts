import {Component, OnInit} from '@angular/core';
import { QcsService } from '../qcs.service';
import { MatTableDataSource } from '@angular/material/table';
import { QuantumExecutionResourceService } from '../../quantum-execution-resource/quantum-execution-resource.service';
import { FilterService } from '../../filter/filter.service';
import {BaseTableModel} from '../../generictable/table.model';
import {QuantumCloudService} from '../quantum-cloud-service.model';

@Component({
  selector: 'app-quantum-cloud-services-table',
  templateUrl: './quantum-cloud-services-table.component.html',
  styleUrls: ['../../app.component.scss', './quantum-cloud-services-table.component.scss']
})
export class QuantumCloudServicesTableComponent implements OnInit{

  dataSource;
  qcsTableModel: QcsTableModel;

  constructor(private qcsService: QcsService, private qerService: QuantumExecutionResourceService, private filterService: FilterService) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.qcsService.getAllQuantumCloudServicesResources());
    this.qcsTableModel = new QcsTableModel(this.dataSource);

    this.filterService.qcsFilterEvent$.subscribe(filter => {
      this.dataSource = new MatTableDataSource(filter);
      this.qcsTableModel.dataSource.next(this.dataSource);
    });

    this.filterService.searchEvent$.subscribe(value => {
      this.dataSource.filter = value;
    });

    this.filterService.showQCSTable.subscribe(value => {
      this.qcsTableModel.hideTable.next(!value);
    });
  }
}

class QcsTableModel extends BaseTableModel<QuantumCloudService> {
  columns = [
    {name: 'name', label: 'Quantum Cloud Service'},
    {name: 'accessMethods'},
    {name: 'serviceModel'},
    {name: 'resources'},
    {name: 'assemblyLanguage'}
  ];
}
