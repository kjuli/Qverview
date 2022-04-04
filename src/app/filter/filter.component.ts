import { Component, OnInit } from '@angular/core';
import { SdkService } from '../sdk/sdk.service';
import { FilterService } from './filter.service';
import { QuantumExecutionResourceService } from '../quantum-execution-resource/quantum-execution-resource.service';
import { QcsService } from '../quantum-cloud-service/qcs.service';
import {License, SoftwareDevelopmentKit} from '../sdk/sdk.model';
import { SdkFilterModel } from './sdkFilter.model';
import { QcsFilterModel } from './qcsFilter.model';
import { QuantumCloudService } from '../quantum-cloud-service/quantum-cloud-service.model';
import { QerFilterModel } from './qerFilter.model';
import { QuantumExecutionResource } from '../quantum-execution-resource/quantum-execution-resource.model';
import { ProgrammingLanguageService } from '../programming-language/programming-language.service';
import { ProgrammingLanguage } from '../programming-language/programming-language.model';
import { QplFilterModel } from './qplFilter.model';
import { CompilerFilterModel } from './compilerFilter.model';
import { CompilerService } from '../compiler/compiler.service';
import { Compiler } from '../compiler/compiler.model';
import { OrchestratorService } from '../orchestrator/orchestrator.service';
import { Orchestrator } from '../orchestrator/orchestrator.model';
import { OrchestratorFilterModel } from './orchestratorFilter.model';
import {SelectionChange} from './filter.model';
import {FilterField} from './filter-panel/filter-panel.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['../app.component.scss', './filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor(public filterService: FilterService, private sdkService: SdkService, private qcsService: QcsService,
              private qerService: QuantumExecutionResourceService, private qplService: ProgrammingLanguageService,
              private compilerService: CompilerService, private orchestratorService: OrchestratorService) {
    this.filterService.syncSdkQcsEvent$.subscribe(value => {
      this.filterService.centralData.sdkCrossTableQcs = value;
      this.updateView({selection: this.filterService.selection});
    });
    this.filterService.syncQcsQerEvent$.subscribe(value => {
      this.filterService.centralData.qcsCrossTableQer = value;
      this.updateView({selection: this.filterService.selection});
    });
  }

  showSdkTable = true;
  showQCSTable = true;
  showQERTable = true;
  showPLTable = true;
  showCompilerTable = true;
  showOTable = true;

  globalConnection: 'and' | 'or' = 'and';

  sdkFields: FilterField[] = [
    {label: 'SDKs', field: 'sdks', clear: this.filterService.clearSdks},
    {label: 'Licenses', field: 'licenses', clear: this.filterService.clearLicenses},
    {label: 'Programming Languages', field: 'programmingLanguages'},
  ];
  qcsFields: FilterField[] = [
    {label: 'Quantum Cloud Services', field: 'quantumCloudServices', clear: () => this.filterService.clearQcs()},
    {label: 'Access Methods', field: 'accessMethods', clear: () => this.filterService.clearAccessMethods()},
    {label: 'Service Model', field: 'serviceModels', clear: () => this.filterService.clearServiceModels()},
    {label: 'Assembly Language', field: 'assemblyLanguages', clear: () => this.filterService.clearAssemlbyLanguages()}
  ];
  qerFields: FilterField[] = [
      {label: 'Quantum Execution Resource', field: 'quantumExecutionResources', clear: () => this.filterService.clearQer()},
      {label: 'Execution Type', field: 'executionTypes', clear: this.filterService.clearExecutionType},
      {label: 'Computation Models', field: 'computationModels', clear: this.filterService.clearComputationModel},
      {label: 'Vendors', field: 'vendors', clear: this.filterService.clearVendor}
  ];
  qplFields: FilterField[] = [
      {label: 'Type', field: 'qplTypes', clear: this.filterService.clearQplTypes},
      {label: 'Syntax Implementation', field: 'qplSyntaxImplementations', clear: this.filterService.clearQplSyntaxImplementations},
      {label: 'Standardization', field: 'qplStandardization', clear: () => {}}
  ];
  compilerFields: FilterField[] = [
      {label: 'Compiler', field: 'compilers', clear: this.filterService.clearCompilers},
      {label: 'Input Languages', field: 'compilerInputLanguages', clear: this.filterService.clearCompilerInputLanguages},
      {label: 'Output Languages', field: 'compilerOutputLanguages', clear: this.filterService.clearCompilerOutputLanguages},
      {label: 'Optimization Strategies', field: 'compilerOptimizationStrategies', clear: this.filterService.clearCompilerOptimizationStrategies}
  ];
  orchestratorFields: FilterField[] = [
      {label: 'Orchestrator', field: 'orchestrators', clear: this.filterService.clearOrchestrators},
      {label: 'Licenses', field: 'orchestratorLicenses', clear: this.filterService.clearOrchestratorLicenses},
      {label: 'Languages', field: 'orchestratorProgrammingLanguages', clear: this.filterService.clearOrchestratorLanguages},
  ];

  ngOnInit(): void {
    this.filterService.registerListener(this.updateView);
  }

  addAll(source: any[], target: any[]): void {
    source.forEach(x => {
      if (!target.includes(x)) {
        target.push(x);
      }
    });
  }

  clearAll(): void {
      this.filterService.clearAll();
  }

  updateView = (selectionChange: SelectionChange) => {
      const selection = selectionChange.selection;
      const sdkFilter: SdkFilterModel = {
        names: selection.sdks,
        licenses: selection.licenses,
        programmingLanguages: selection.programmingLanguages
      };
      let filteredSdks: SoftwareDevelopmentKit[] = this.sdkService.getFilteredSdks(sdkFilter);
      console.log('Filtered Sdks: <' + filteredSdks.length + '>');

      const qcsFilter: QcsFilterModel = {
        names: selection.quantumCloudServices,
        accessMethods: selection.accessMethods,
        serviceModels: selection.serviceModels,
        resources: [],
        assemblyLanguages: selection.assemblyLanguages,
      };
      if (selection.quantumCloudServices.length > 0) {
        console.log('Selected Quantum cloud service: ' + selection.quantumCloudServices);
        console.log('Type: ' + typeof(selection.quantumCloudServices[0]));
      }
      let filteredQcs: QuantumCloudService[] = this.qcsService.getFilteredQcs(qcsFilter);

      const qerFilter: QerFilterModel = {
        names: selection.quantumExecutionResources,
        executionType: selection.executionTypes,
        computationModels: selection.computationModels,
        vendors: selection.vendors
      };
      let filteredQers: QuantumExecutionResource[] = this.qerService.getFilteredQers(qerFilter);

      let hasChanged = true;
      while (hasChanged) {
        const oldSdks = filteredSdks.length;
        const oldQcs = filteredQcs.length;
        const oldQers = filteredQers.length;
        if (this.filterService.centralData.sdkCrossTableQcs) {
          filteredQcs = filteredQcs.filter(value => this.qcsIsSupportedBySdks(filteredSdks, value));
          filteredSdks = filteredSdks.filter(value => this.sdkIsSupportedByQcs(filteredQcs, value));
        }
        if (this.filterService.centralData.qcsCrossTableQer) {
          filteredQers = filteredQers.filter(value => this.qerIsSupportedByQcs(filteredQcs, value));
          filteredQcs = filteredQcs.filter(value => this.qcsIsSupportedByQer(filteredQers, value));
        }
        hasChanged = (oldSdks !== filteredSdks.length || oldQcs !== filteredQcs.length || oldQers !== filteredQers.length);
      }

      const qplFilter: QplFilterModel = {
        names: selection.programmingLanguages,
        types: selection.qplTypes,
        syntaxImplementations: selection.qplSyntaxImplementations,
        standardizations: selection.qplStandardizations
      };
      const filteredQpls: ProgrammingLanguage[] = this.qplService.getFilteredQpls(qplFilter);

      const compilerFilter: CompilerFilterModel = {
        names: selection.compilers,
        inputLanguages: selection.compilers,
        outputLanguages: selection.compilers,
        optimizationStrategies: selection.compilers
      };
      const filteredCompilers: Compiler[] = this.compilerService.getFilteredCompilers(compilerFilter);

      const orchestratorFilter: OrchestratorFilterModel = {
        names: selection.orchestrators,
        licenses: selection.orchestratorLicenses,
        programmingLanguages: selection.programmingLanguages,
        activeDevelopment: selection.activeDevelopment,
        productionReady: selection.productionReady
      };
      const filteredOrchestrators: Orchestrator[] = this.orchestratorService.getFilteredOrchestrators(orchestratorFilter);

      this.filterService.setSdkFilter(filteredSdks);
      this.filterService.setQcsFilter(filteredQcs);
      this.filterService.setQerFilter(filteredQers);
      this.filterService.setQplFilter(filteredQpls);
      this.filterService.setCompilerFilter(filteredCompilers);
      this.filterService.setOrchestratorFilter(filteredOrchestrators);
  }

  private qcsIsSupportedBySdks(sdks: SoftwareDevelopmentKit[], quantumCloudService: QuantumCloudService): boolean {
    const allSupportedQcs = [];
    sdks.forEach(sdk => {
      sdk.supportedQuantumCloudServices.forEach(value => {
        if (!allSupportedQcs.includes(value)) {
          allSupportedQcs.push(value);
        }
      });
    });
    return allSupportedQcs.includes(quantumCloudService);
  }

  private sdkIsSupportedByQcs(qcss: QuantumCloudService[], sdk: SoftwareDevelopmentKit): boolean {
    const namesOfAllActiveCloudServices = [];
    qcss.forEach(qcs => {
      if (!namesOfAllActiveCloudServices.includes(qcs)) {
        namesOfAllActiveCloudServices.push(qcs);
      }
    });

    let result = false;
    sdk.supportedQuantumCloudServices.forEach(qcs => {
      if (namesOfAllActiveCloudServices.includes(qcs)) {
        result = true;
      }
    });
    return result;
  }

  private qerIsSupportedByQcs(qcss: QuantumCloudService[], qer: QuantumExecutionResource): boolean {
    const namesOfAllSupportedQers: QuantumExecutionResource[] = [];
    qcss.forEach(qcs => {
      qcs.resources.forEach(value => {
        if (!namesOfAllSupportedQers.includes(value)) {
          namesOfAllSupportedQers.push(value);
        }
      });
    });
    return namesOfAllSupportedQers.includes(qer);
  }

  private qcsIsSupportedByQer(qers: QuantumExecutionResource[], qcs: QuantumCloudService): boolean {
    const namesOfAllActiveQers = [];
    qers.forEach(qer => {
      if (!namesOfAllActiveQers.includes(qer)) {
        namesOfAllActiveQers.push(qer);
      }
    });

    let result = false;
    qcs.resources.forEach(qer => {
      if (namesOfAllActiveQers.includes(qer)) {
        result = true;
      }
    });
    return result;
  }

  searchAll(event: KeyboardEvent): void {
     const filterValue = (event.target as HTMLInputElement).value;
     this.filterService.search(filterValue.trim().toLowerCase());
  }

  updateShowTable(): void {
    this.filterService.setShowSdkTable(this.showSdkTable);
    this.filterService.setShowQCSTable(this.showQCSTable);
    this.filterService.setShowQERTable(this.showQERTable);
    this.filterService.setShowPLTable(this.showPLTable);
    this.filterService.setShowOTable(this.showOTable);
    this.filterService.setShowCompilerTable(this.showCompilerTable);
  }

  changeGlobalConnection(): void {
      switch (this.globalConnection) {
          case 'and': this.globalConnection = 'or'; break;
          case 'or': this.globalConnection = 'and'; break;
      }
  }
}
