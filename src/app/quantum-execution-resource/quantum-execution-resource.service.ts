import { Injectable } from '@angular/core';
import { QuantumExecutionResource, QuantumExecutionResourceDto } from './quantum-execution-resource.model';
// @ts-ignore
import quantumExecutionResources from '../../../data/old/QuantumExecutionResources.json';
import { QerFilterModel } from '../filter/qerFilter.model';
import {NameRepository, Repository} from '../common/repository';
import API_STATE from '../api/api.model';
import {QuantumCloudService} from '../quantum-cloud-service/quantum-cloud-service.model';



@Injectable({
  providedIn: 'root'
})
export class QuantumExecutionResourceService extends NameRepository<QuantumExecutionResource> {

  constructor() {
    super('qer', QuantumExecutionResource.fromDto);
  }

  // protected receiveData(): QuantumExecutionResource[] {
  //   return API_STATE.qer.map(dto => QuantumExecutionResource.fromDto(dto));
  // }

  get quantumExecutionResources(): QuantumExecutionResource[] {
    return this.data;
  }

  getFilteredQers(qerFilter: QerFilterModel): QuantumExecutionResource[] {
    return this.quantumExecutionResources.filter(value => this.isActive(value, qerFilter));
  }

  isActive(qer: QuantumExecutionResource, filter: QerFilterModel): boolean {
    if (filter.names.length > 0 && !filter.names.includes(qer)) {
      return false;
    }
    if (filter.executionType.length > 0 && !filter.executionType.includes(qer.executionType)) {
      return false;
    }
    if (filter.computationModels.length > 0 && !filter.computationModels.includes(qer.computationModel)) {
      return false;
    }
    if (filter.vendors.length > 0 && !filter.vendors.includes(qer.vendor)) {
      return false;
    }
    return true;
  }

}
