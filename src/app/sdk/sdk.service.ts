import { Injectable } from '@angular/core';
import { SdkDto, SoftwareDevelopmentKit } from './sdk.model';
// @ts-ignore
import softwareDevelopmentKitsJson from '../../../data/SoftwareDevelopmentKits.json';
import { SdkFilterModel } from '../filter/sdkFilter.model';
import { QcsService } from '../quantum-cloud-service/qcs.service';
import { ProgrammingLanguageService } from '../programming-language/programming-language.service';
import { supportsOneOf } from '../filter/filter.service';
import {NameRepository, Repository} from '../common/repository';

@Injectable({
  providedIn: 'root'
})
export class SdkService extends NameRepository<SoftwareDevelopmentKit> {
  private readonly sdks: SdkDto[] = softwareDevelopmentKitsJson;

  constructor(private readonly qcsService: QcsService, private readonly languageService: ProgrammingLanguageService) {
    super();
  }

  get softwareDevelopmentKits(): SoftwareDevelopmentKit[] {
    return this.data;
  }

  protected receiveData(): SoftwareDevelopmentKit[] {
    return this.sdks.map(value => SoftwareDevelopmentKit.fromDto(value, this.languageService, this.qcsService));
  }

  getFilteredSdks(sdkFilter: SdkFilterModel): SoftwareDevelopmentKit[] {
    return this.softwareDevelopmentKits.filter(value => this.isActive(value, sdkFilter));
  }

  private isActive(sdk: SoftwareDevelopmentKit, filter: SdkFilterModel): boolean {
    let result = true;
    if (filter.names.length > 0 && !filter.names.includes(sdk)) {
      result = false;
    }
    if (!supportsOneOf(filter.licenses, sdk.licenses)) {
      result = false;
    }
    if (!supportsOneOf(filter.programmingLanguages, sdk.programmingLanguages)) {
      result = false;
    }
    if (!supportsOneOf(filter.compilerInputLanguages, sdk.compilerInputLanguages)) {
      result = false;
    }
    if (!supportsOneOf(filter.compilerOutputLanguages, sdk.compilerOutputLanguages)) {
      result = false;
    }
    if (!supportsOneOf(filter.compilerOptimizationStrategies, sdk.compilerOptimizationStrategies)) {
      result = false;
    }
    if (filter.activeDevelopment.length > 0 && !filter.activeDevelopment.includes(sdk.activeDevelopment)) {
      result = false;
    }
    if (!supportsOneOf(filter.supportedQuantumCloudServices, sdk.supportedQuantumCloudServices)) {
      result = false;
    }
    if (filter.localSimulator.length > 0 && filter.localSimulator.includes(sdk.localSimulator)) {
      result = false;
    }

    return result;
  }
}
