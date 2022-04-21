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
import {ConnectedFilterModel, SelectionChange} from './filter.model';
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
      this.updateView({selection: this.filterService.selection, connector: {}});
    });
    this.filterService.syncQcsQerEvent$.subscribe(value => {
      this.filterService.centralData.qcsCrossTableQer = value;
      this.updateView({selection: this.filterService.selection, connector: {}});
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
    {label: 'SDKs', field: 'sdks', clear: this.filterService.clearSdks, showAndOr: false},
    {label: 'Licenses', field: 'licenses', clear: this.filterService.clearLicenses},
    {label: 'Programming Languages', field: 'programmingLanguages'},
  ];
  qcsFields: FilterField[] = [
    {label: 'Quantum Cloud Services', field: 'quantumCloudServices', clear: () => this.filterService.clearQcs(), showAndOr: false},
    {label: 'Access Methods', field: 'accessMethods', clear: () => this.filterService.clearAccessMethods()},
    {label: 'Service Model', field: 'serviceModels', clear: () => this.filterService.clearServiceModels()},
    {label: 'Assembly Language', field: 'assemblyLanguages', clear: () => this.filterService.clearAssemlbyLanguages()}
  ];
  qerFields: FilterField[] = [
      {label: 'Quantum Execution Resource', field: 'quantumExecutionResources', clear: () => this.filterService.clearQer(), showAndOr: false},
      {label: 'Execution Type', field: 'executionTypes', clear: () => this.filterService.clearExecutionType()},
      {label: 'Computation Models', field: 'computationModels', clear: () => this.filterService.clearComputationModel()},
      {label: 'Vendors', field: 'vendors', clear: () => this.filterService.clearVendor()}
  ];
  qplFields: FilterField[] = [
      {label: 'Type', field: 'qplTypes', clear: () => this.filterService.clearQplTypes(), showAndOr: false},
      {label: 'Syntax Implementation', field: 'qplSyntaxImplementations', clear: () => this.filterService.clearQplSyntaxImplementations()},
      {label: 'Standardization', field: 'qplStandardization', clear: () => {}}
  ];
  compilerFields: FilterField[] = [
      {label: 'Compiler', field: 'compilers', clear: () => this.filterService.clearCompilers(), showAndOr: false},
      {label: 'Input Languages', field: 'compilerInputLanguages', clear: () => this.filterService.clearCompilerInputLanguages()},
      {label: 'Output Languages', field: 'compilerOutputLanguages', clear: () => this.filterService.clearCompilerOutputLanguages()},
      {label: 'Optimization Strategies', field: 'compilerOptimizationStrategies', clear: () => this.filterService.clearCompilerOptimizationStrategies()}
  ];
  orchestratorFields: FilterField[] = [
      {label: 'Orchestrator', field: 'orchestrators', clear: this.filterService.clearOrchestrators, showAndOr: false},
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
      const sdkFilter: ConnectedFilterModel<SdkFilterModel> = {
        names: {filter: selection.sdks, connector: selectionChange.connector.sdk || 'or' },
        licenses: {filter: selection.licenses, connector: selectionChange.connector.licenses || 'or'},
        programmingLanguages: {filter: selection.programmingLanguages, connector: selectionChange.connector.programmingLanguages || 'or'}
      };
      let filteredSdks: SoftwareDevelopmentKit[] = this.sdkService.getFilteredSdks(sdkFilter);
      console.log('Filtered Sdks: <' + filteredSdks.length + '>');

      const qcsFilter: ConnectedFilterModel<QcsFilterModel> = {
        names: {filter: selection.quantumCloudServices, connector: selectionChange.connector.quantumCloudServices || 'or' },
        accessMethods: {filter: selection.accessMethods, connector: selectionChange.connector.accessMethods || 'or' },
        serviceModels: {filter: selection.serviceModels, connector: selectionChange.connector.serviceModels || 'or' },
        resources: {filter: [], connector: 'or' },
        assemblyLanguages: {filter: selection.assemblyLanguages, connector: selectionChange.connector.assemblyLanguages || 'or' }
      };
      if (selection.quantumCloudServices.length > 0) {
        console.log('Selected Quantum cloud service: ' + selection.quantumCloudServices);
        console.log('Type: ' + typeof(selection.quantumCloudServices[0]));
      }
      let filteredQcs: QuantumCloudService[] = this.qcsService.getFilteredQcs(qcsFilter);

      const qerFilter: ConnectedFilterModel<QerFilterModel> = {
        names: {filter: selection.quantumExecutionResources, connector: selectionChange.connector.quantumExecutionResources || 'or' },
        executionType: {filter: selection.executionTypes, connector: selectionChange.connector.executionType || 'or' },
        computationModels: {filter: selection.computationModels, connector: selectionChange.connector.computationModels || 'or' },
        vendors: {filter: selection.vendors, connector: selectionChange.connector.vendors || 'or' },
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

      const qplFilter: ConnectedFilterModel<QplFilterModel> = {
        names: {filter: selection.programmingLanguages, connector: selectionChange.connector.programmingLanguages || 'or' },
        types: {filter: selection.qplTypes, connector: selectionChange.connector.qplTypes || 'or' },
        syntaxImplementations: { filter: selection.qplSyntaxImplementations, connector: selectionChange.connector.qplSyntaxImplementation || 'or' },
        standardizations: { filter: selection.qplStandardizations, connector: selectionChange.connector.qplStandardization || 'or' }
      };
      const filteredQpls: ProgrammingLanguage[] = this.qplService.getFilteredQpls(qplFilter);

      const compilerFilter: ConnectedFilterModel<CompilerFilterModel> = {
        names: {filter: selection.compilers, connector: selectionChange.connector.compiler || 'or' },
        inputLanguages: {filter: selection.compilerInputLanguages, connector: selectionChange.connector.compilerInputLanguages || 'or' },
        outputLanguages: {filter: selection.compilerOutputLanguages, connector: selectionChange.connector.compilerOutputLanguages || 'or' },
        optimizationStrategies: {filter: selection.compilerOptimizationStrategies, connector: selectionChange.connector.compilerOptimizationStrategies || 'or' }
      };
      const filteredCompilers: Compiler[] = this.compilerService.getFilteredCompilers(compilerFilter);

      const orchestratorFilter: ConnectedFilterModel<OrchestratorFilterModel> = {
        names: {filter: selection.orchestrators, connector: selectionChange.connector.orchestrators || 'or' },
        licenses: {filter: selection.orchestratorLicenses, connector: selectionChange.connector.orchestratorLicenses || 'or' },
        programmingLanguages: {filter: selection.programmingLanguages, connector: selectionChange.connector.programmingLanguages || 'or' },
        activeDevelopment: {filter: [], connector: 'or' },
        productionReady: {filter: [], connector: 'or' } // TODO: This must be gone.
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
      this.filterService.setGlobalConnection(this.globalConnection);
  }
}
