import {Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SdkService } from '../sdk.service';
import { FilterService } from '../../filter/filter.service';
import {getLicenseColorCode, SoftwareDevelopmentKit} from '../sdk.model';
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
    this.sdkTableModel = new SdkTableModel(this.sdkService);
    this.sdkTableModel.connectToFilterService(this.filterService.sdkFilterEvent$, this.filterService.searchEvent$,
      this.filterService.showSdkTable);
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

class SdkTableModel extends BaseTableModel<SoftwareDevelopmentKit> {

  columns = [
    {name: 'name', label: 'Software Development Kit', filterValue: 'sdks'},
    {name: 'licenses', filterValue: 'licenses'},
    {name: 'programmingLanguages', filterValue: 'languages'},
    {name: 'compiler'},
    {name: 'supportedQuantumCloudServices', filterValue: 'quantumCloudServices'},
  ];
}
