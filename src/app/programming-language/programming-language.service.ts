import { Injectable } from '@angular/core';
import { ProgrammingLanguage, ProgrammingLanguageDto, ProgrammingType } from './programming-language.model';
// @ts-ignore
import programmingLanguagesJson from '../../../data/old/ProgrammingLanguages.json';
import { QerFilterModel } from '../filter/qerFilter.model';
import { QuantumExecutionResource } from '../quantum-execution-resource/quantum-execution-resource.model';
import { QplFilterModel } from '../filter/qplFilter.model';
import {NameRepository, Repository} from '../common/repository';
import API_STATE from '../api/api.model';

@Injectable({
  providedIn: 'root'
})
export class ProgrammingLanguageService extends NameRepository<ProgrammingLanguage> {

  constructor() {
    super('programmingLanguage', ProgrammingLanguage.fromDto);
  }

  get programmingLanguages(): ProgrammingLanguage[] {
    return this.data;
  }

  getFilteredQpls(qplFilter: QplFilterModel): ProgrammingLanguage[] {
    return this.programmingLanguages.filter(value => this.isActive(value, qplFilter));
  }

  isAssemblyLanguage(programmingLanguage: ProgrammingLanguage): boolean {
    return programmingLanguage.type === ProgrammingType.Assembly;
  }

  // protected receiveData(): ProgrammingLanguage[] {
  //   return API_STATE.programmingLanguages.map(value => ProgrammingLanguage.fromDto(value));
  // }

  private isActive(qpl: ProgrammingLanguage, filter: QplFilterModel): boolean {
    if (filter.names.length > 0 && !filter.names.includes(qpl)) {
      return false;
    }
    if (filter.types.length > 0 && !filter.types.includes(qpl.type)) {
      return false;
    }
    if (filter.syntaxImplementations.length > 0 && !filter.syntaxImplementations.includes(qpl.syntaxImplementation)) {
      return false;
    }
    if (filter.standardizations.length > 0 && !filter.standardizations.includes(qpl.standardization)) {
      return false;
    }
    return true;
  }
}
