import { Injectable } from '@angular/core';
import { QuantumCloudService, QuantumCloudServiceDto } from './quantum-cloud-service.model';
// @ts-ignore
import cloudServicesJson from '../../../data/CloudServices.json';
import { FilterService, supportsOneOf } from '../filter/filter.service';
import { SdkService } from '../sdk/sdk.service';
import { QcsFilterModel } from '../filter/qcsFilter.model';
import { QuantumExecutionResourceService } from '../quantum-execution-resource/quantum-execution-resource.service';
import { ProgrammingType } from '../programming-language/programming-language.model';
import { ProgrammingLanguageService } from '../programming-language/programming-language.service';

@Injectable({
  providedIn: 'root'
})
export class QcsService {

  private readonly qcs: QuantumCloudServiceDto[] = cloudServicesJson;
  private cache: QuantumCloudService[];

  constructor(private languageService: ProgrammingLanguageService,
              private qerService: QuantumExecutionResourceService) {
  }

  get quantumCloudServices(): QuantumCloudService[] {
    if (this.cache !== null && this.cache !== undefined) {
      return this.cache;
    }

    this.cache = this.qcs.map(value => QuantumCloudService.fromDto(value, this.qerService, this.languageService));
    return this.cache;
  }

  findByName(name: string): QuantumCloudService {
    return this.quantumCloudServices.find(value => value.name === name);
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
