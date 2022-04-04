import {License, SoftwareDevelopmentKit} from '../sdk/sdk.model';

export class FilterModel {
    sdks = [];
    //selectedSdks = [];
    licenses: License[] = [];
    //selectedLicenses: any = [];
    programmingLanguages = [];
    //selectedProgrammingLanguages = [];
    inputLanguages = [];
    //selectedInputLanguages = [];
    outputLanguages = [];
    //selectedOutputLanguages = [];
    optimizationStrategies = [];
    //selectedOptimizationStrategies = [];

    sdkCrossTableQcs = false;
    quantumCloudServices = [];
    //selectedQuantumCloudServices = [];
    accessMethods = [];
    //selectedAccessMethods = [];
    serviceModels = [];
    //selectedServiceModels = [];
    assemblyLanguages = [];
    //selectedAssemblyLanguages = [];

    qcsCrossTableQer = false;
    quantumExecutionResources = [];
    //selectedQuantumExecutionResources = [];
    executionTypes = [];
    //selectedExecutionType = [];
    computationModels = [];
    //selectedComputationModels = [];
    vendors = [];
    //selectedVendors = [];

    qplTypes = [];
    //selectedQplTypes = [];
    qplSyntaxImplementations = [];
    //selectedQplSyntaxImplementations = [];
    qplStandardizations = [];
    //selectedQplStandardizations = [];

    compilers = [];
    //selectedCompilers = [];
    compilerInputLanguages = [];
    //selectedCompilerInputLanguages = [];
    compilerOutputLanguages = [];
    //selectedCompilerOutputLanguages = [];
    compilerOptimizationStrategies = [];
    //selectedCompilerOptimizationStrategies = [];

    orchestrators = [];
    //selectedOrchestrators = [];
    orchestratorLicenses = [];
    //selectedOrchestratorLicenses = [];
    orchestratorProgrammingLanguages = [];
    //selectedOrchestratorProgrammingLanguages = [];
    activeDevelopment = [true, false];
    //selectedActiveDevelopment = [];
    productionReady = [true, false];
    //selectedProductionReady = [];

    public sortAllData(): void {
        for (const key of Object.keys(this)) {
            if (Array.isArray(this[key])) {
                this[key].sort();
            }
        }
    }
}

export class Selection extends FilterModel {
    activeDevelopment = [];
    productionReady = [];

    public clearAll(): void {
        for (const key of Object.keys(this)) {
            if (Array.isArray(this[key])) {
                this[key] = [];
            }
        }
    }

}

export interface SelectionChange {
    selection: Selection;
    sourceOfChange?: string;
    connector: {[key: string]: 'and' | 'or'};
}

export type ConnectedFilter<FilterType> = {
    filter: FilterType;
    connector: 'and' | 'or';
};

export type ConnectedFilterModel<FilterModelType> = {
    [Property in keyof FilterModelType]: ConnectedFilter<FilterModelType[Property]>;
};
