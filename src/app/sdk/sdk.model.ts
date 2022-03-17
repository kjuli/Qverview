import {BaseDto, Entity} from '../common/repository';
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
import {Compiler} from '../compiler/compiler.model';
import {CompilerService} from '../compiler/compiler.service';
import randomColor from 'randomcolor';

export interface SdkDto extends BaseDto {
    licenses: string[];
    programmingLanguages: string[];
    compiler: string[];
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
    licenses.add(str);
    return str;
}

/**
 * Returns the array of all available licenses.
 * @returns array of current licenses.
 */
export function getAllLicenses(): License[] {
    return Array.from(licenses);
}

export function getLicenseColorCode(): object {
    const settings = {luminosity: 'light'};
    const colors = {};
    for (const license of licenses) {
        colors[license] = randomColor(settings);
    }
    return colors;
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
    compiler: Compiler[];
    supportedQuantumCloudServices: QuantumCloudService[];
    activeDevelopment: boolean;
    localSimulator: boolean;

    static fromDto(dto: SdkDto, languageService: ProgrammingLanguageService, cloudService: QcsService, compilerService: CompilerService): SoftwareDevelopmentKit {
        const result = new SoftwareDevelopmentKit();

        result.name = dto.name;
        result.link = dto.link;
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

        result.compiler = dto.compiler.map(c => compilerService.findByName(c));
        result.supportedQuantumCloudServices = dto.supportedQuantumCloudServices.map(value => cloudService.findByName(value));

        result.references = dto._references;
        result.description = dto.description;

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
