import { Injectable } from '@angular/core';
import { Orchestrator } from './orchestrator.model';
// @ts-ignore
import orchestratorsJson from '../../../data/old/Orchestrators.json';
import { OrchestratorFilterModel } from '../filter/orchestratorFilter.model';
import { QplFilterModel } from '../filter/qplFilter.model';
import { ProgrammingLanguage } from '../programming-language/programming-language.model';
import {NameRepository} from "../common/repository";
import {ProgrammingLanguageService} from "../programming-language/programming-language.service";
import {supportsOneOf} from "../filter/filter.service";
import REPOSITORY_STATE from '../repository/repositoryModel';

@Injectable({
  providedIn: 'root'
})
export class OrchestratorService extends NameRepository<Orchestrator> {

  constructor(private languageService: ProgrammingLanguageService) {
    super('orchestrator', data => Orchestrator.fromDto(data, languageService));
  }

  get orchestrators(): Orchestrator[] {
    return this.data;
  }

  // protected receiveData(): Orchestrator[] {
  //   return API_STATE.orchestrators.map(value => Orchestrator.fromDto(value, this.languageService));
  // }

  getFilteredOrchestrators(orchestratorFilter: OrchestratorFilterModel): Orchestrator[] {
    return this.orchestrators.filter(value => this.isActive(value, orchestratorFilter));
  }

  private isActive(orchestrator: Orchestrator, filter: OrchestratorFilterModel): boolean {
    if (filter.names.length > 0 && !filter.names.includes(orchestrator)) {
      return false;
    }
    if (!supportsOneOf(filter.licenses, orchestrator.licenses)) {
      return false;
    }
    if (!supportsOneOf(filter.programmingLanguages, orchestrator.programmingLanguages)) {
      return false;
    }
    if (filter.activeDevelopment.length > 0 && !filter.activeDevelopment.includes(orchestrator.activeDevelopment)) {
      return false;
    }
    if (filter.productionReady.length > 0 && !filter.productionReady.includes(orchestrator.productionReady)) {
      return false;
    }
    return true;
  }

}
