import {ProgrammingLanguage, ProgrammingLanguageDto} from '../programming-language/programming-language.model';
import {OrchestratorDto} from '../orchestrator/orchestrator.model';
import {QuantumExecutionResourceDto} from '../quantum-execution-resource/quantum-execution-resource.model';
import {CompilerDto} from '../compiler/compiler.model';
import {QuantumCloudServiceDto} from '../quantum-cloud-service/quantum-cloud-service.model';
import {SdkDto, SoftwareDevelopmentKit} from '../sdk/sdk.model';
import {ReplaySubject, Subject} from 'rxjs';

export type RepositoryModel = {
  programmingLanguage: Subject<ProgrammingLanguageDto[]>;
  orchestrator: Subject<OrchestratorDto[]>;
  qer: Subject<QuantumExecutionResourceDto[]>;
  compiler: Subject<CompilerDto[]>;
  qcs: Subject<QuantumCloudServiceDto[]>;
  sdk: Subject<SdkDto[]>;
  references: Subject<string>;
};

export type RepositoryParameters = {
  [Property in keyof RepositoryModel]: any
};

/**
 * The state of all API DTOs the specific repositories can fetch.
 */
const REPOSITORY_STATE: RepositoryModel = {
  programmingLanguage: new ReplaySubject<ProgrammingLanguageDto[]>(),
  orchestrator: new ReplaySubject<OrchestratorDto[]>(),
  qer: new ReplaySubject<QuantumExecutionResourceDto[]>(),
  compiler: new ReplaySubject<CompilerDto[]>(),
  qcs: new ReplaySubject<QuantumCloudServiceDto[]>(),
  sdk: new ReplaySubject<SdkDto[]>(),
  references: new ReplaySubject()
};

export default REPOSITORY_STATE;
