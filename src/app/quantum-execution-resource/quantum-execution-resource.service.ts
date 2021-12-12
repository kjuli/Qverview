import { Injectable } from '@angular/core';
import { QuantumExecutionResource, QuantumExecutionResourceDto } from './quantum-execution-resource.model';
// @ts-ignore
import quantumExecutionResources from '../../../data/QuantumExecutionResources.json';
import { FilterService } from '../filter/filter.service';
import { QerFilterModel } from '../filter/qerFilter.model';
import { QuantumCloudService } from '../quantum-cloud-service/quantum-cloud-service.model';
import { QcsFilterModel } from '../filter/qcsFilter.model';
import { Repository } from '../common/repository';
import assert from 'assert';



@Injectable({
  providedIn: 'root'
})
export class QuantumExecutionResourceService implements Repository<QuantumExecutionResource> {

  private readonly quantumExecutionResourcesDto: QuantumExecutionResourceDto[] = quantumExecutionResources;
  private cache: QuantumExecutionResource[];

  constructor() {
  }

  get data(): QuantumExecutionResource[] {
    return this.quantumExecutionResources;
  }

  get quantumExecutionResources(): QuantumExecutionResource[] {
    if (this.cache !== null && this.cache !== undefined) {
      return this.cache;
    }

    this.cache = this.quantumExecutionResourcesDto.map(value => QuantumExecutionResource.fromDto(value));
    assert(this.cache !== undefined);
    return this.cache;
  }

  getFilteredQers(qerFilter: QerFilterModel): QuantumExecutionResource[] {
    return this.quantumExecutionResources.filter(value => this.isActive(value, qerFilter));
  }

  findByName(name: string): QuantumExecutionResource | undefined {
    return this.quantumExecutionResources.find(value => value.name === name);
  }

  findByID(id: string): QuantumExecutionResource | undefined {
    return this.findByName(id);
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
