import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { SoftwareDevelopmentKit } from '../sdk/sdk.model';
import { QuantumCloudService } from '../quantum-cloud-service/quantum-cloud-service.model';
import { QuantumExecutionResource } from '../quantum-execution-resource/quantum-execution-resource.model';
import { ProgrammingLanguage } from '../programming-language/programming-language.model';
import { Compiler } from '../compiler/compiler.model';
import { Orchestrator } from '../orchestrator/orchestrator.model';
import {FilterModel, Selection, SelectionChange} from './filter.model';
import {QcsService} from '../quantum-cloud-service/qcs.service';
import {OrchestratorService} from '../orchestrator/orchestrator.service';
import {SdkService} from '../sdk/sdk.service';
import {QuantumExecutionResourceService} from '../quantum-execution-resource/quantum-execution-resource.service';
import {ProgrammingLanguageService} from '../programming-language/programming-language.service';
import {CompilerService} from '../compiler/compiler.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private sdkFilterSubject = new Subject<SoftwareDevelopmentKit[]>();
  private qcsFilterSubject = new Subject<QuantumCloudService[]>();
  private qerFilterSubject = new Subject<QuantumExecutionResource[]>();
  private syncSdkQcsSubject = new Subject<boolean>();
  private syncQcsQerSubject = new Subject<boolean>();
  private qplFilterSubject = new Subject<ProgrammingLanguage[]>();
  private compilerFilterSubject = new Subject<Compiler[]>();
  private orchestratorFilterSubject = new Subject<Orchestrator[]>();

  private searchSubject = new Subject<string>();
  private showSdkTableSubject = new Subject<boolean>();
  private showQCSTableSubject = new Subject<boolean>();
  private showQERTableSubject = new Subject<boolean>();
  private showPLTableSubject = new Subject<boolean>();
  private showOTableSubject = new Subject<boolean>();
  private showCompilerTableSubject = new Subject<boolean>();

  public readonly centralData = new FilterModel();
  public readonly selection = new Selection();

  private readonly selectionSubject = new BehaviorSubject<SelectionChange>({
    selection: this.selection
  });

  public constructor(private sdkService: SdkService, private qcsService: QcsService,
                     private qerService: QuantumExecutionResourceService, private qplService: ProgrammingLanguageService,
                     private compilerService: CompilerService, private orchestratorService: OrchestratorService) {
    this.collectCompilerData();
    this.collectOrchastratorData();
    this.collectQcsData();
    this.collectQerData();
    this.collectSdkData();
    this.collectPlData();
  }

  public registerListener(listener: (value: SelectionChange) => void): void {
    this.selectionSubject.subscribe(listener);
  }

  public updateSelectionField(field: string, value: any, sourceOfChange?: string): void {
    // if (!(field in Object.keys(this.selection))) {
    //   console.warn(`this is not a valid field: ${field}`);
    //   return;
    // }

    this.selection[field] = value;
    this.selectionSubject.next({selection: this.selection, sourceOfChange});
  }

  setShowCompilerTable(showCompilerTable: boolean): void {
    this.showCompilerTableSubject.next(showCompilerTable);
  }

  get showCompilerTable(): Observable<boolean> {
    return this.showCompilerTableSubject.asObservable();
  }

  setShowOTable(showOTable: boolean): void {
    this.showOTableSubject.next(showOTable);
  }

  get showOTable(): Observable<boolean> {
    return this.showOTableSubject.asObservable();
  }

  get showSdkTable(): Observable<boolean> {
    return this.showSdkTableSubject.asObservable();
  }

  setShowSdkTable(value: boolean): void {
    this.showSdkTableSubject.next(value);
  }

  get showQCSTable(): Observable<boolean> {
    return this.showQCSTableSubject.asObservable();
  }

  setShowQCSTable(showQCSTable: boolean): void {
    this.showQCSTableSubject.next(showQCSTable);
  }

  get showQERTable(): Observable<boolean> {
    return this.showQERTableSubject.asObservable();
  }

  setShowQERTable(showQERTable: boolean): void {
    this.showQERTableSubject.next(showQERTable);
  }

  get showPLTable(): Observable<boolean> {
    return this.showPLTableSubject.asObservable();
  }

  setShowPLTable(showPLTable: boolean): void {
    this.showPLTableSubject.next(showPLTable);
  }

  get sdkFilterEvent$(): Observable<SoftwareDevelopmentKit[]> {
    return this.sdkFilterSubject.asObservable();
  }

  setSdkFilter(filteredSdks: SoftwareDevelopmentKit[]): void {
    this.sdkFilterSubject.next(filteredSdks);
  }

  get qcsFilterEvent$(): Observable<QuantumCloudService[]> {
    return this.qcsFilterSubject.asObservable();
  }

  setQcsFilter(filteredQcs: QuantumCloudService[]): void {
    this.qcsFilterSubject.next(filteredQcs);
  }

  get qerFilterEvent$(): Observable<QuantumExecutionResource[]> {
    return this.qerFilterSubject.asObservable();
  }

  setQerFilter(filteredQers: QuantumExecutionResource[]): void {
    this.qerFilterSubject.next(filteredQers);
  }

  get syncSdkQcsEvent$(): Observable<boolean> {
    return this.syncSdkQcsSubject.asObservable();
  }

  setSyncSdkQcs(value: boolean): void {
    this.syncSdkQcsSubject.next(value);
  }

  get syncQcsQerEvent$(): Observable<boolean> {
    return this.syncQcsQerSubject.asObservable();
  }

  setSyncQcsQer(value: boolean): void {
    this.syncQcsQerSubject.next(value);
  }

  get qplFilterEvent$(): Observable<ProgrammingLanguage[]> {
    return this.qplFilterSubject.asObservable();
  }

  setQplFilter(filteredQpls: ProgrammingLanguage[]): void {
    this.qplFilterSubject.next(filteredQpls);
  }

  get compilerFilterEvent$(): Observable<Compiler[]> {
    return this.compilerFilterSubject.asObservable();
  }

  setCompilerFilter(filteredCompilers: Compiler[]): void {
    this.compilerFilterSubject.next(filteredCompilers);
  }

  get orchestratorFilterEvent$(): Observable<Orchestrator[]> {
    return this.orchestratorFilterSubject.asObservable();
}

  setOrchestratorFilter(filteredOrchestrators: Orchestrator[]): void {
    this.orchestratorFilterSubject.next(filteredOrchestrators);
  }

  search(filterValue: string): void {
    this.searchSubject.next(filterValue);
  }

  get searchEvent$(): Observable<string> {
    return this.searchSubject.asObservable();
  }

  private collectOrchastratorData(): void {
    for (const orchestrator of this.orchestratorService.orchestrators) {
      this.centralData.orchestrators.push(orchestrator);
      this.addAll(orchestrator.licenses, this.centralData.orchestratorLicenses);
      this.addAll(orchestrator.programmingLanguages, this.centralData.orchestratorProgrammingLanguages);
    }
  }

  private collectCompilerData(): void {
    for (const compiler of this.compilerService.compilers) {
      this.centralData.compilers.push(compiler);
      this.addAll(compiler.inputLanguages, this.centralData.compilerInputLanguages);
      this.addAll(compiler.outputLanguages, this.centralData.compilerOutputLanguages);
      this.addAll(compiler.optimizationStrategies, this.centralData.compilerOptimizationStrategies);
    }
  }

  private collectPlData(): void {
    for (const qpl of this.qplService.programmingLanguages) {
      this.centralData.programmingLanguages.push(qpl);
      if (!this.centralData.qplTypes.includes(qpl.type)) {
        this.centralData.qplTypes.push(qpl.type);
      }
      if (!this.centralData.qplSyntaxImplementations.includes(qpl.syntaxImplementation)) {
        this.centralData.qplSyntaxImplementations.push(qpl.syntaxImplementation);
      }
      if (!this.centralData.qplStandardizations.includes(qpl.standardization)) {
        this.centralData.qplStandardizations.push(qpl.standardization);
      }
    }
  }

  private collectQerData(): void {
    for (const qer of this.qerService.quantumExecutionResources) {
      this.centralData.quantumExecutionResources.push(qer);
      this.centralData.executionTypes = ['QPU', 'Simulator'];
      if (!this.centralData.computationModels.includes(qer.computationModel)) {
        this.centralData.computationModels.push(qer.computationModel);
      }
      if (!this.centralData.vendors.includes(qer.vendor)) {
        this.centralData.vendors.push(qer.vendor);
      }
    }
  }

  private collectQcsData(): void {
    for (const qcs of this.qcsService.quantumCloudServices) {
      this.centralData.quantumCloudServices.push(qcs);
      this.addAll(qcs.accessMethods, this.centralData.accessMethods);
      if (!this.centralData.serviceModels.includes(qcs.serviceModel)) {
        this.centralData.serviceModels.push(qcs.serviceModel);
      }
      this.addAll(qcs.assemblyLanguages, this.centralData.assemblyLanguages);
    }
  }

  clearAll(): void {
    for (const field of Object.keys(this.selection)) {
      if (Array.isArray(this.selection[field])) {
         this.clear(field)();
      }
    }
  }

  clear(field: string): () => void {
    if (this.selection[field]) {
      return () => {
        this.updateSelectionField(field, []);
      };
    }
    return () => {console.warn('Could not clear field: ' + field)};
  }

  clearSdks = () => {
    this.selection.sdks = [];
  }

  clearLicenses = () => {
    this.selection.licenses = [];
  }

  clearProgrammingLanguages(): void {
    this.selection.programmingLanguages = [];
    this.updateSelectionField('programmingLanguages', []);
  }

  clearInputLanguages(): void {
    this.selection.inputLanguages = [];
  }

  clearOutputLanguages(): void {
    this.selection.outputLanguages = [];
  }

  clearOptimizationStrategies(): void {
    this.selection.optimizationStrategies = [];
  }

  clearQcs(): void {
    this.selection.quantumCloudServices = [];
  }

  clearAccessMethods(): void {
    this.selection.accessMethods = [];
  }

  clearServiceModels(): void {
    this.selection.serviceModels = [];
  }

  clearAssemlbyLanguages(): void {
    this.selection.assemblyLanguages = [];
  }

  clearQer(): void {
    this.selection.quantumExecutionResources = [];
  }

  clearExecutionType(): void {
    this.selection.executionTypes = [];
  }

  clearComputationModel(): void {
    this.selection.computationModels = [];
  }

  clearVendor(): void {
    this.selection.vendors = [];
  }

  clearQplTypes(): void {
    this.selection.qplTypes = [];
  }

  clearQplSyntaxImplementations(): void {
    this.selection.qplSyntaxImplementations = [];
  }

  clearCompilers(): void {
    this.selection.compilers = [];
  }

  clearCompilerInputLanguages(): void {
    this.selection.compilerInputLanguages = [];
  }

  clearCompilerOutputLanguages(): void {
    this.selection.compilerOutputLanguages = [];
  }

  clearCompilerOptimizationStrategies(): void {
    this.selection.compilerOptimizationStrategies = [];
  }

  clearOrchestrators(): void {
    this.selection.orchestrators = [];
  }

  clearOrchestratorLicenses(): void {
    this.selection.orchestratorLicenses = [];
  }

  clearOrchestratorLanguages(): void {
    this.selection.orchestratorProgrammingLanguages = [];
  }

  clearActiveDevelopment(): void {
    this.selection.activeDevelopment = [];
  }

  clearProductionReady(): void {
    this.selection.productionReady = [];
  }

  private collectSdkData(): void {
    for (const sdk of this.sdkService.softwareDevelopmentKits) {
      this.centralData.sdks.push(sdk);
      this.addAll(sdk.licenses, this.centralData.licenses);
    }
  }

  private addAll(source: any[], target: any[]): void {
    source.forEach(x => {
      if (!target.includes(x)) {
        target.push(x);
      }
    });
  }
}

/**
 * Returns whether the array can be filtered by the given keys, that is,
 * the array contains the same values as the filter keys.
 *
 * If filterKeys is empty, this will always return true.
 *
 * @param filterKeys The keys to filter the array.
 * @param array The array itself that should be filtered.
 * @returns true if the filtered array is not empty, or if filterKeys is empty.
 */
export function supportsOneOf(filterKeys: any[], array: any[]): boolean {
  return ((filterKeys === null || filterKeys === undefined || filterKeys.length === 0) ||
          (array !== null && array !== undefined && array.find(value => filterKeys.includes(value)) !== undefined));
}

export function getEnumFromString<T extends string>(enumArray: T[], str: string): T {
  const result = enumArray.find(value => value.toLowerCase() === str.toLowerCase());
  if (result === undefined) {
      console.error(`The specified string is not a correct value! ${str}`);
      return str as T;
  }
  return result;
}
