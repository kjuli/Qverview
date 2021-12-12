import { Injectable } from '@angular/core';
import { ProgrammingLanguage, ProgrammingLanguageDto, ProgrammingType } from './programming-language.model';
// @ts-ignore
import programmingLanguagesJson from '../../../data/ProgrammingLanguages.json';
import { QerFilterModel } from '../filter/qerFilter.model';
import { QuantumExecutionResource } from '../quantum-execution-resource/quantum-execution-resource.model';
import { QplFilterModel } from '../filter/qplFilter.model';

@Injectable({
  providedIn: 'root'
})
export class ProgrammingLanguageService {

  private readonly programmingLanguagesDto: ProgrammingLanguageDto[] = programmingLanguagesJson;
  private cache: ProgrammingLanguage[];

  constructor() { }

  get programmingLanguages(): ProgrammingLanguage[] {
    if (this.cache !== null && this.cache !== undefined) {
      return this.cache;
    }

    this.cache = this.programmingLanguagesDto.map(value => ProgrammingLanguage.fromDto(value));
    return this.cache;
  }

  getFilteredQpls(qplFilter: QplFilterModel): ProgrammingLanguage[] {
    return this.programmingLanguages.filter(value => this.isActive(value, qplFilter));
  }

  isAssemblyLanguage(programmingLanguage: ProgrammingLanguage): boolean {
    return programmingLanguage.type === ProgrammingType.Assembly;
  }

  findByName(name: string): ProgrammingLanguage {
    return this.programmingLanguages.find(value => value.name === name);
  }

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
