import {Entity} from '../common/repository';
import {ProgrammingLanguage} from '../programming-language/programming-language.model';
import {CompilerOptimizationStrategy, SoftwareDevelopmentKit} from '../sdk/sdk.model';
import {SdkService} from '../sdk/sdk.service';
import {ProgrammingLanguageService} from '../programming-language/programming-language.service';
import {getEnumFromString} from '../filter/filter.service';

export interface SdkLanguageFlavorDto {
  sdk: string;
  flavor: string;
}

export interface LanguageFlavorDto {
  language: string;
  flavor: string;
}

export type InputOutputLanguageDto = SdkLanguageFlavorDto | LanguageFlavorDto | string;

export interface CompilerDto {
  name: string;
  inputLanguages: InputOutputLanguageDto[];
  outputLanguages: InputOutputLanguageDto[];
  optimizationStrategies: string[];
}

export type InputOutputLanguage = ProgrammingLanguage | {
  language: ProgrammingLanguage;
  flavor: ProgrammingLanguage;
} | {
  sdk: string; // TODO: Cyclic dependency
  flavor: ProgrammingLanguage;
};

export class Compiler extends Entity {
  inputLanguages: (InputOutputLanguage)[] = [];
  outputLanguages: (InputOutputLanguage)[] = [];
  optimizationStrategies: CompilerOptimizationStrategy[];

  static fromDto(dto: CompilerDto, languageService: ProgrammingLanguageService): Compiler {
    const result = new Compiler();

    result.name = dto.name;
    result.inputLanguages = dto.inputLanguages.map(value => this.convert(value, languageService));
    result.outputLanguages = dto.outputLanguages.map(value => this.convert(value, languageService));
    result.optimizationStrategies = dto.optimizationStrategies.map(value =>
      getEnumFromString([CompilerOptimizationStrategy.HardwareIndependent, CompilerOptimizationStrategy.HardwareSpecific], value));

    return result;
  }

  private static convert(value: InputOutputLanguageDto, languageService: ProgrammingLanguageService): InputOutputLanguage {
    if (typeof value === 'string') {
      return languageService.findByName(value);
    } else if (value['language'] !== undefined) {
      const languageFlavorDto = value as LanguageFlavorDto;
      return {
        language: languageService.findByName(languageFlavorDto.language),
        flavor: languageService.findByName(languageFlavorDto.flavor),
        toString(): string {
          return this.language + '+' + this.flavor;
        }
      };
    } else {
      const sdkFlavorDto = value as SdkLanguageFlavorDto;
      return {
        sdk: sdkFlavorDto.sdk,
        flavor: languageService.findByName(sdkFlavorDto.flavor),
        toString(): string {
          return this.sdk + '+' + this.flavor;
        }
      };
    }
  }
}
