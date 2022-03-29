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
import {Subject} from 'rxjs';
import {FilterModel, Selection, SelectionChange} from './filter.model';
import {FilterField} from './filter-panel/filter-panel.component';
import {filter} from 'rxjs/operators';

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
    // this.collectSdkData();
    // this.collectQcsData();
    // this.collectQerData();
    // this.collectPlData();
    // this.collectCompilerData();
    // this.collectOrchastratorData();
    // this.sortAllData();

    // this.filterService.selection.subscribe(this.updateSelection);
    this.filterService.registerListener(this.updateView);
  }

  // private sortAllData() {
  //   this.centralData.sortAllData();
  // }
  //
  // private collectOrchastratorData(): void {
  //   for (const orchestrator of this.orchestratorService.orchestrators) {
  //     this.centralData.orchestrators.push(orchestrator);
  //     this.addAll(orchestrator.licenses, this.centralData.orchestratorLicenses);
  //     this.addAll(orchestrator.programmingLanguages, this.centralData.orchestratorProgrammingLanguages);
  //   }
  // }
  //
  // private collectCompilerData(): void {
  //   for (const compiler of this.compilerService.compilers) {
  //     this.centralData.compilers.push(compiler);
  //     this.addAll(compiler.inputLanguages, this.centralData.compilerInputLanguages);
  //     this.addAll(compiler.outputLanguages, this.centralData.compilerOutputLanguages);
  //     this.addAll(compiler.optimizationStrategies, this.centralData.compilerOptimizationStrategies);
  //   }
  // }
  //
  // private collectPlData(): void {
  //   for (const qpl of this.qplService.programmingLanguages) {
  //     this.centralData.programmingLanguages.push(qpl);
  //     if (!this.centralData.qplTypes.includes(qpl.type)) {
  //       this.centralData.qplTypes.push(qpl.type);
  //     }
  //     if (!this.centralData.qplSyntaxImplementations.includes(qpl.syntaxImplementation)) {
  //       this.centralData.qplSyntaxImplementations.push(qpl.syntaxImplementation);
  //     }
  //     if (!this.centralData.qplStandardizations.includes(qpl.standardization)) {
  //       this.centralData.qplStandardizations.push(qpl.standardization);
  //     }
  //   }
  // }
  //
  // private collectQerData(): void {
  //   for (const qer of this.qerService.quantumExecutionResources) {
  //     this.centralData.quantumExecutionResources.push(qer.name);
  //     this.centralData.executionTypes = ['QPU', 'Simulator'];
  //     if (!this.centralData.computationModels.includes(qer.computationModel)) {
  //       this.centralData.computationModels.push(qer.computationModel);
  //     }
  //     if (!this.centralData.vendors.includes(qer.vendor)) {
  //       this.centralData.vendors.push(qer.vendor);
  //     }
  //   }
  // }
  //
  // private collectQcsData(): void {
  //   for (const qcs of this.qcsService.quantumCloudServices) {
  //     this.centralData.quantumCloudServices.push(qcs.name);
  //     this.addAll(qcs.accessMethods, this.centralData.accessMethods);
  //     if (!this.centralData.serviceModels.includes(qcs.serviceModel)) {
  //       this.centralData.serviceModels.push(qcs.serviceModel);
  //     }
  //     this.addAll(qcs.assemblyLanguages, this.centralData.assemblyLanguages);
  //   }
  // }

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

  // updateView(): void {
  //   this.updateSelection(this.filterService.selection);
  // }

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
    const namesOfAllSupportedQers = [];
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

}
