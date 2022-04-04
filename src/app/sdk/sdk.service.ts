import { Injectable } from '@angular/core';
import { SdkDto, SoftwareDevelopmentKit } from './sdk.model';
// @ts-ignore
import softwareDevelopmentKitsJson from '../../../data/old/SoftwareDevelopmentKits.json';
import { SdkFilterModel } from '../filter/sdkFilter.model';
import { QcsService } from '../quantum-cloud-service/qcs.service';
import { ProgrammingLanguageService } from '../programming-language/programming-language.service';
import {FilterService, filterSupports, supports, supportsOneOf} from '../filter/filter.service';
import {NameRepository, Repository} from '../common/repository';
import {RepositoryService} from "../repository/repository.service";
import {Observable} from "rxjs";
import {CompilerService} from '../compiler/compiler.service';
import {ConnectedFilterModel} from '../filter/filter.model';

@Injectable({
  providedIn: 'root'
})
export class SdkService extends NameRepository<SoftwareDevelopmentKit> {

  constructor(private readonly qcsService: QcsService,
              private readonly languageService: ProgrammingLanguageService,
              private readonly compilerService: CompilerService) {
    super('sdk', data => SoftwareDevelopmentKit.fromDto(data, languageService, qcsService, compilerService));
  }

  get softwareDevelopmentKits(): SoftwareDevelopmentKit[] {
    return this.data;
  }

  getFilteredSdks(sdkFilter: ConnectedFilterModel<SdkFilterModel>): SoftwareDevelopmentKit[] {
    return this.softwareDevelopmentKits.filter(value => this.isActive(value, sdkFilter));
  }

  private isActive(sdk: SoftwareDevelopmentKit, filter: ConnectedFilterModel<SdkFilterModel>): boolean {
    return filterSupports([
        { filter: filter.names, array: [sdk] },
        { filter: filter.licenses, array: sdk.licenses },
        { filter: filter.programmingLanguages, array: sdk.programmingLanguages }
    ]);
  }
}
