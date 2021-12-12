import {Entity} from "../common/repository";
import {ProgrammingLanguage} from "../programming-language/programming-language.model";
import {CompilerOptimizationStrategy, SdkLanguage} from "../sdk/sdk.model";
import {SdkService} from "../sdk/sdk.service";
import {ProgrammingLanguageService} from "../programming-language/programming-language.service";
import {getEnumFromString} from "../filter/filter.service";

export interface CompilerDto {
  name: string;
  inputLanguages: string[];
  outputLanguages: string[];
  optimizationStrategies: string[];
}

export class Compiler extends Entity {
  inputLanguages: (SdkLanguage | ProgrammingLanguage)[];
  outputLanguages: (SdkLanguage | ProgrammingLanguage)[];
  optimizationStrategies: CompilerOptimizationStrategy[];

  static fromDto(dto: CompilerDto, sdkService: SdkService, languageService: ProgrammingLanguageService): Compiler {
    const result = new Compiler();

    result.name = dto.name;
    result.inputLanguages = dto.inputLanguages.map(value => this.convert(value, sdkService, languageService));
    result.outputLanguages = dto.outputLanguages.map(value => this.convert(value, sdkService, languageService));
    result.optimizationStrategies = dto.optimizationStrategies.map(value =>
      getEnumFromString([CompilerOptimizationStrategy.HardwareIndependent, CompilerOptimizationStrategy.HardwareSpecific], value));

    return result;
  }

  private static convert(value: string, sdkService: SdkService, languageService: ProgrammingLanguageService): (SdkLanguage | ProgrammingLanguage) {
    if (value.includes('+')) {
      return SdkLanguage.fromString(value, sdkService, languageService);
    } else {
      return languageService.findByName(value);
    }
  }
}
