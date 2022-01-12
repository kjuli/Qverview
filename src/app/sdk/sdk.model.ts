import { Entity } from '../common/repository';
import { getEnumFromString } from '../filter/filter.service';
import {
  AssemblyProgrammingLanguage,
  getAsAssemblyLanguage,
  getAsHighlevelProgrammingLanguage,
  HighLevelProgrammingLanguage,
  LanguageCombination,
  ProgrammingLanguage
} from '../programming-language/programming-language.model';
import { ProgrammingLanguageService } from '../programming-language/programming-language.service';
import { QcsService } from '../quantum-cloud-service/qcs.service';
import { QuantumCloudService } from '../quantum-cloud-service/quantum-cloud-service.model';
import { SdkService } from './sdk.service';

export interface SdkDto {
    name: string;
    licenses: string[];
    programmingLanguages: string[];
    compilerInputLanguages: string[];
    compilerOutputLanguages: string[];
    compilerOptimizationStrategies: string[];
    activeDevelopment: boolean;
    supportedQuantumCloudServices: string[];
    localSimulator: boolean;
}

/**
 * Since there are many licenses and custom ones,
 * a type is defined instead of an enum.
 */
export type License = string;

/**
 * This caches the available licenses.
 */
const licenses = new Set<License>();

/**
 * Adds a license to the set and "converts" it
 * to the type of {@link License}.
 * @param str the license name.
 */
export function addLicense(str: string): License {
    if (!licenses.has(str)) {
        licenses.add(str);
    }

    return str;
}

/**
 * Returns the array of all available licenses.
 * @returns array of current licenses.
 */
export function getAllLicenses(): License[] {
    return Array.from(licenses);
}

export const enum CompilerOptimizationStrategy {
    HardwareSpecific = 'hardware-specific',
    HardwareIndependent = 'hardware-independent'
}

const COMPILER_OPTIMIZATION_STRATEGIES = [
    CompilerOptimizationStrategy.HardwareIndependent,
    CompilerOptimizationStrategy.HardwareSpecific
];

export class SoftwareDevelopmentKit extends Entity {
    licenses: License[];
    programmingLanguages: HighLevelProgrammingLanguage[];
    compilerInputLanguages: (AssemblyProgrammingLanguage | LanguageCombination | SdkInstance)[];
    compilerOutputLanguages: (AssemblyProgrammingLanguage | LanguageCombination | SdkInstance)[];
    compilerOptimizationStrategies: CompilerOptimizationStrategy[];
    supportedQuantumCloudServices: QuantumCloudService[];
    activeDevelopment: boolean;
    localSimulator: boolean;

    static fromDto(dto: SdkDto, languageService: ProgrammingLanguageService, cloudService: QcsService): SoftwareDevelopmentKit {
        const result = new SoftwareDevelopmentKit();

        result.name = dto.name;
        result.activeDevelopment = dto.activeDevelopment;
        result.localSimulator = dto.localSimulator;
        result.licenses = dto.licenses.map(value => addLicense(value));

        result.programmingLanguages = dto.programmingLanguages.map(language => {
            try {
                const programmingLanguage = languageService.findByName(language);
                return getAsHighlevelProgrammingLanguage(programmingLanguage);
            } catch (err) {
                console.log('Error occured: ' + err);
            }
        });

        result.compilerInputLanguages = dto.compilerInputLanguages.map(language => {
            try {
                const programmingLanguage = languageService.findByName(language);
                return getAsAssemblyLanguage(programmingLanguage);
            } catch (err) {
                console.log('Error occurred: ' + err);
            }
        });

        result.compilerOutputLanguages = dto.compilerOutputLanguages.map(language => {
            try {
                const programmingLanguage = languageService.findByName(language);
                return getAsAssemblyLanguage(programmingLanguage);
            } catch (err) {
                console.log('Error occurred: ' + err);
            }
        });

        result.compilerOptimizationStrategies = dto.compilerOptimizationStrategies.map(
          value => getEnumFromString(COMPILER_OPTIMIZATION_STRATEGIES, value));

        result.supportedQuantumCloudServices = dto.supportedQuantumCloudServices.map(value => cloudService.findByName(value));


        return result;
    }
}

/**
 * This interface describes that not only an SDK was used,
 * but also a certain programming language that.
 *
 * For example, a compiler only supports a certain SDK for
 * Python, even though that SDK could also be used in Java.
 */
export interface SdkInstance {
  sdk: SoftwareDevelopmentKit;
  highLevelProgrammingLanguage: HighLevelProgrammingLanguage;
}

export function sdkInstanceFrom(sdk: SoftwareDevelopmentKit, highLevelProgrammingLanguage: HighLevelProgrammingLanguage): SdkInstance {
  return {
    sdk,
    highLevelProgrammingLanguage
  };
}
