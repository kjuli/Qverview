import { Injectable } from '@angular/core';
import { Compiler } from './compiler.model';
// @ts-ignore
import compilersAndTranspilersJson from '../../../data/old/CompilersAndTranspilers.json';
import { QuantumCloudService } from '../quantum-cloud-service/quantum-cloud-service.model';
import {FilterService, filterSupports, supportsOneOf} from '../filter/filter.service';
import { CompilerFilterModel } from '../filter/compilerFilter.model';
import {NameRepository} from "../common/repository";
import {SdkService} from "../sdk/sdk.service";
import {ProgrammingLanguageService} from "../programming-language/programming-language.service";
import REPOSITORY_STATE from '../repository/repositoryModel';
import {ConnectedFilterModel} from '../filter/filter.model';

@Injectable({
  providedIn: 'root'
})
export class CompilerService extends NameRepository<Compiler> {

  constructor( private languageService: ProgrammingLanguageService) {
    super('compiler', data => Compiler.fromDto(data, languageService));
  }

  // protected receiveData(): Compiler[] {
  //   return API_STATE.compilers.map(value => Compiler.fromDto(value, this.sdkService, this.languageService));
  // }

  get compilers(): Compiler[] {
    return this.data;
  }

  getFilteredCompilers(compilerFilter: ConnectedFilterModel<CompilerFilterModel>): Compiler[] {
    return this.compilers.filter(value => this.isActive(value, compilerFilter));
  }

  private isActive(compiler: Compiler, filter: ConnectedFilterModel<CompilerFilterModel>): boolean {
    // if (filter.names.length > 0 && !filter.names.includes(compiler)) {
    //   return false;
    // }
    // if (!supportsOneOf(filter.inputLanguages, compiler.inputLanguages)) {
    //   return false;
    // }
    // if (!supportsOneOf(filter.outputLanguages, compiler.outputLanguages)) {
    //   return false;
    // }
    // if (!supportsOneOf(filter.optimizationStrategies, compiler.optimizationStrategies)) {
    //   return false;
    // }
    // return true;
    return filterSupports([
      { filter: filter.names, array: [compiler] },
      { filter: filter.inputLanguages, array: compiler.inputLanguages },
      { filter: filter.outputLanguages, array: compiler.outputLanguages },
      { filter: filter.optimizationStrategies, array: compiler.outputLanguages }
    ]);
  }

}
