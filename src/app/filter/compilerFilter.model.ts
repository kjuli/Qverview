import {Compiler} from "../compiler/compiler.model";
import {ProgrammingLanguage} from "../programming-language/programming-language.model";
import {CompilerOptimizationStrategy, SdkLanguage} from "../sdk/sdk.model";

export interface CompilerFilterModel {
  names: Compiler[];
  inputLanguages: (SdkLanguage | ProgrammingLanguage)[];
  outputLanguages: (SdkLanguage | ProgrammingLanguage)[];
  optimizationStrategies: CompilerOptimizationStrategy[];
}
