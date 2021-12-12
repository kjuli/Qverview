import {AccessMethod, QuantumCloudService, ServiceModel} from "../quantum-cloud-service/quantum-cloud-service.model";
import {QuantumExecutionResource} from "../quantum-execution-resource/quantum-execution-resource.model";
import {AssemblyProgrammingLanguage} from "../programming-language/programming-language.model";

export interface QcsFilterModel {
  names: QuantumCloudService[];
  accessMethods: AccessMethod[];
  serviceModels: ServiceModel[];
  resources: QuantumExecutionResource[];
  assemblyLanguages: AssemblyProgrammingLanguage[];
}
