import {
  AssemblyProgrammingLanguage,
  HighLevelProgrammingLanguage
} from "../programming-language/programming-language.model";
import {CompilerOptimizationStrategy, License, SoftwareDevelopmentKit} from "../sdk/sdk.model";
import {QuantumCloudService} from "../quantum-cloud-service/quantum-cloud-service.model";

export interface SdkFilterModel {
  names: SoftwareDevelopmentKit[];
  licenses: License[];
  programmingLanguages: HighLevelProgrammingLanguage[];
}
