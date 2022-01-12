import {Compiler} from "../compiler/compiler.model";
import {ProgrammingLanguage} from "../programming-language/programming-language.model";
import {CompilerOptimizationStrategy, SdkInstance} from '../sdk/sdk.model';

export interface CompilerFilterModel {
  names: Compiler[];
  inputLanguages: (SdkInstance | ProgrammingLanguage)[];
  outputLanguages: (SdkInstance | ProgrammingLanguage)[];
  optimizationStrategies: CompilerOptimizationStrategy[];
}
