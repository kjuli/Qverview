import {getEnumFromString} from '../filter/filter.service';
import {
  AssemblyProgrammingLanguage,
  getAsAssemblyLanguage,
  ProgrammingLanguage,
  ProgrammingType
} from '../programming-language/programming-language.model';
import {ProgrammingLanguageService} from '../programming-language/programming-language.service';
import {QuantumExecutionResource} from '../quantum-execution-resource/quantum-execution-resource.model';
import {QuantumExecutionResourceService} from '../quantum-execution-resource/quantum-execution-resource.service';
import {Entity} from '../common/repository';

export interface QuantumCloudServiceDto {
  name: string;
  accessMethods: string[];
  serviceModel: string;
  resources: string[];
  assemblyLanguages: string[];
}

export const enum AccessMethod {
  SDK = 'SDK',
  GUI = 'GUI',
  REST = 'REST',
  CLI = 'CLI',
  SDK3rd = 'SDK (3rd party)',
  GUI3rd = 'GUI (3rd party)',
  REST3rd = 'REST (3rd party)',
}

const ACCESS_METHODS = [
  AccessMethod.SDK,
  AccessMethod.GUI,
  AccessMethod.REST,
  AccessMethod.SDK3rd,
  AccessMethod.GUI3rd,
  AccessMethod.REST3rd,
  AccessMethod.CLI
];

export const enum ServiceModel {
  QCaaS = 'QCaaS',
  PaaSorSaaS = 'PaaS/SaaS',
}

const SERVICE_MODELS = [
  ServiceModel.QCaaS,
  ServiceModel.PaaSorSaaS
];

export class QuantumCloudService extends Entity {
  accessMethods: AccessMethod[] = [];
  serviceModel: ServiceModel;
  resources: QuantumExecutionResource[] = [];
  assemblyLanguages: AssemblyProgrammingLanguage[] = [];

  /**
   * Converts the DTO to this class instance.
   *
   * @param dto The data transfer object to be converted.
   * @param qerService The service needed to retrieve the corresponding Quantum Execution Resources
   * @param languageService The service needed to retrieve the corresponding Programming Languages (in this case, assembly languages)
   * @returns The actual typed data.
   */
  static fromDto(dto: QuantumCloudServiceDto,
                 qerService: QuantumExecutionResourceService,
                 languageService: ProgrammingLanguageService): QuantumCloudService {
    const result = new QuantumCloudService();

    result.name = dto.name;
    result.accessMethods = dto.accessMethods.map(value => getEnumFromString(ACCESS_METHODS, value));
    result.serviceModel = getEnumFromString(SERVICE_MODELS, dto.serviceModel);
    result.resources = dto.resources.map(name => qerService.findByName(name));

    for (const language of dto.assemblyLanguages) {
      console.log("Find " + language);
      const programmingLanguage = languageService.findByName(language);
      result.assemblyLanguages.push(getAsAssemblyLanguage(programmingLanguage));
    }

    return result;
  }
}
