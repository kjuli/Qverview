import {Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SdkService } from '../sdk.service';
import { FilterService } from '../../filter/filter.service';
import { Sdk } from '../sdk.model';
import {BaseTableModel} from '../../generictable/table.model';

@Component({
  selector: 'app-sdks-table',
  templateUrl: './sdks-table.component.html',
  styleUrls: ['../../app.component.scss', './sdks-table.component.scss']
})
export class SdksTableComponent implements OnInit {

  dataSource;
  sdkTableModel: SdkTableModel;

  constructor(private sdkService: SdkService, private filterService: FilterService) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Sdk>(this.sdkService.getAllSdks());
    this.sdkTableModel = new SdkTableModel(this.dataSource);

    this.filterService.sdkFilterEvent$.subscribe(filter => {
      this.sdkTableModel.dataSource.next(new MatTableDataSource(filter));
    });

    this.filterService.searchEvent$.subscribe(value => {
      this.dataSource.filter = value;
    });

    this.filterService.showSdkTable.subscribe(value => {
      this.sdkTableModel.hideTable.next(!value);
    });
  }

  licensesClicked(license: string): void {
    // this.filterService.toggleLicense(license);
  }

  programmingLanguageClicked(language: string): void {
    // this.filterService.toggleProgrammingLanguage(language);
  }

  compilerInputLanguageClicked(compilerInputLanguage: string): void {
    // this.filterService.toggleAssemblyLanguage(compilerInputLanguage);
  }

  compilerOutputLanguageClicked(compilerOutputLanguage: string): void {
    // this.filterService.toggleAssemblyLanguage(compilerOutputLanguage);
  }

  activeDevelopmentClicked(activeDevelopment: string): void {
    // this.filterService.toggleActiveDevelopment(activeDevelopment);
  }

  supportedQuantumCloudServiceClicked(supportedQuantumCloudService: string): void {
    // this.filterService.toggleQuantumCloudService(supportedQuantumCloudService);
  }

  localSimulatorClicked(localSimulator: string): void {
    // this.filterService.toggleLocalSimulator(localSimulator);
  }
}

class SdkTableModel extends BaseTableModel<Sdk> {

  columns = [
    {name: 'name', label: 'Software Development Kit'},
    {name: 'licenses'},
    {name: 'compilerInputLanguages'},
    {name: 'compilerOutputLanguages'},
    {name: 'compilerOptimizationStrategies'},
    {name: 'supportedQuantumCloudServices'},
    {name: 'activeDevelopment'},
    {name: 'localSimulator'}
  ];
}
