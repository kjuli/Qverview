import { Injectable } from '@angular/core';
import { QuantumExecutionResource, QuantumExecutionResourceDto } from './quantum-execution-resource.model';
// @ts-ignore
import quantumExecutionResources from '../../../data/old/QuantumExecutionResources.json';
import { QerFilterModel } from '../filter/qerFilter.model';
import {NameRepository, Repository} from '../common/repository';
import REPOSITORY_STATE from '../repository/repositoryModel';
import {QuantumCloudService} from '../quantum-cloud-service/quantum-cloud-service.model';
import {filterSupports} from '../filter/filter.service';
import {ConnectedFilterModel} from '../filter/filter.model';



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

  getFilteredQers(qerFilter: ConnectedFilterModel<QerFilterModel>): QuantumExecutionResource[] {
    return this.quantumExecutionResources.filter(value => this.isActive(value, qerFilter));
  }

  isActive(qer: QuantumExecutionResource, filter: ConnectedFilterModel<QerFilterModel>): boolean {
    // if (filter.names.length > 0 && !filter.names.includes(qer)) {
    //   return false;
    // }
    // if (filter.executionType.length > 0 && !filter.executionType.includes(qer.executionType)) {
    //   return false;
    // }
    // if (filter.computationModels.length > 0 && !filter.computationModels.includes(qer.computationModel)) {
    //   return false;
    // }
    // if (filter.vendors.length > 0 && !filter.vendors.includes(qer.vendor)) {
    //   return false;
    // }
    // return true;
    return filterSupports([
      { filter: filter.names, array: [qer] },
      { filter: filter.executionType, array: [qer.executionType] },
      { filter: filter.computationModels, array: [qer.computationModel] },
      { filter: filter.vendors, array: [qer.vendor] }
    ]);
  }

}
