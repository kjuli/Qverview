import { Entity } from '../common/repository';
import { getEnumFromString } from '../filter/filter.service';
import { AssemblyProgrammingLanguage, getAsAssemblyLanguage, getAsHighlevelProgrammingLanguage, HighLevelProgrammingLanguage, ProgrammingLanguage } from '../programming-language/programming-language.model';
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
    compilerInputLanguages: AssemblyProgrammingLanguage[];
    compilerOutputLanguages: AssemblyProgrammingLanguage[];
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
export interface SdkLanguage {
    sdk: SoftwareDevelopmentKit;
    highLevelProgrammingLanguage: HighLevelProgrammingLanguage;
}

/**
 * This class implements the SdkLanguage so that a {@link #toString()} method
 * is defined. With this, an instance of this type can be correctly represented
 * in HTML as follows: "<High-Level Language>+<SDK>"
 */
export class SdkLanguage implements SdkLanguage {

    constructor(public sdk: SoftwareDevelopmentKit, public highLevelProgrammingLanguage: HighLevelProgrammingLanguage) {}

    static from(sdk: SoftwareDevelopmentKit, highLevelLanguage: HighLevelProgrammingLanguage): SdkLanguage {
        if (!sdk.programmingLanguages.includes(highLevelLanguage)) {
            console.warn(`The language ${highLevelLanguage} is not specified in ${sdk} to be used.`);
        }
        return new SdkLanguage(sdk, highLevelLanguage);
    }

    static fromString(sdkLanguageString: string, sdkService: SdkService, languageService: ProgrammingLanguageService): SdkLanguage {
        if (!sdkLanguageString.includes('+')) {
            throw new TypeError('The string is not valid SdkLanguage string: ' + sdkLanguageString);
        }
        const cod = sdkLanguageString.indexOf('+');
        const languageName = sdkLanguageString.substring(0, cod);
        const sdkName = sdkLanguageString.substring(cod + 1);

        const language = getAsHighlevelProgrammingLanguage(languageService.findByName(languageName));
        const sdk = sdkService.findByName(sdkName);

        if (language !== undefined && sdk !== undefined) {
            return SdkLanguage.from(sdk, language);
        } else {
            console.warn(`This does not exist: ${sdkLanguageString}`);
        }
    }

    toString(): string {
        return `${this.highLevelProgrammingLanguage}+${this.sdk}`;
    }
}
