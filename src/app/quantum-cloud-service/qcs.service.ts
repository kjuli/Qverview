import { Injectable } from '@angular/core';
import { QuantumCloudService, QuantumCloudServiceDto } from './quantum-cloud-service.model';
// @ts-ignore
import cloudServicesJson from '../../../data/old/CloudServices.json';
import { FilterService, supportsOneOf } from '../filter/filter.service';
import { SdkService } from '../sdk/sdk.service';
import { QcsFilterModel } from '../filter/qcsFilter.model';
import { QuantumExecutionResourceService } from '../quantum-execution-resource/quantum-execution-resource.service';
import { ProgrammingType } from '../programming-language/programming-language.model';
import { ProgrammingLanguageService } from '../programming-language/programming-language.service';
import {NameRepository} from '../common/repository';

@Injectable({
  providedIn: 'root'
})
export class QcsService extends NameRepository<QuantumCloudService> {

  constructor(private languageService: ProgrammingLanguageService,
              private qerService: QuantumExecutionResourceService) {
    super('qcs', data => QuantumCloudService.fromDto(data, qerService, languageService));
  }

  // protected receiveData(): QuantumCloudService[] {
  //   return this.qcs.map(dto => QuantumCloudService.fromDto(dto, this.qerService, this.languageService));
  // }

  get quantumCloudServices(): QuantumCloudService[] {
    return this.data;
  }

  getFilteredQcs(filter: QcsFilterModel): QuantumCloudService[] {
    return this.quantumCloudServices.filter(value => this.isActive(value, filter));
  }

  isActive(qcs: QuantumCloudService, filter: QcsFilterModel): boolean {
    if (filter.names.length > 0 && !filter.names.includes(qcs)) {
      return false;
    }
    if (!supportsOneOf(filter.accessMethods, qcs.accessMethods)) {
      return false;
    }
    if (filter.serviceModels.length > 0 && !filter.serviceModels.includes(qcs.serviceModel)) {
      return false;
    }
    if (!supportsOneOf(filter.resources, qcs.resources)) {
      return false;
    }
    if (!supportsOneOf(filter.assemblyLanguages, qcs.assemblyLanguages)) {
      return false;
    }
    return true;
  }
}
