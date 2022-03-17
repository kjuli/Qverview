import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {fromFetch} from "rxjs/fetch";
import REPOSITORY_STATE, {RepositoryModel, RepositoryParameters} from './repositoryModel';
import {ProgrammingLanguageDto} from '../programming-language/programming-language.model';
import {OrchestratorDto} from '../orchestrator/orchestrator.model';
import {QuantumExecutionResourceDto} from '../quantum-execution-resource/quantum-execution-resource.model';
import {SplashscreenStateService} from '../splash/splashscreen-state.service';
import {AppConfigService} from '../config/app-config.service';

/**
 * This service provides a way to receive the necessary
 * data.
 */
@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  private expectedCalls: number;
  private conductedCalls = 0;

  /**
   * The base url.
   */
  baseUrl: string = AppConfigService.settings.defaultRepository;

  constructor(private httpClient: HttpClient, private splashScreenService: SplashscreenStateService) { }

  private static handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error(`An error occurred: ${error.error.message}`);
    } else {
      console.error(`Backend returned code ${error.status}, body was ${error.error}`);
    }

    return throwError(error);
  }

  getData<T>(jsonFileName: string): Observable<T> {
    return this.httpClient.get<T>(this.baseUrl + '/' + jsonFileName, {
      headers: {
        'Content-Type': 'text/plain'
      }
    }).pipe(
      catchError(RepositoryService.handleError)
    );
  }

  public getAllData(baseUrl?: string): Promise<RepositoryModel> {
    this.conductedCalls = 0;
    if (baseUrl) {
      this.baseUrl = baseUrl;
    }

    const observables: RepositoryParameters = {
      programmingLanguage: this.getData<ProgrammingLanguageDto[]>('ProgrammingLanguages.json'),
      orchestrator: this.getData<OrchestratorDto[]>('Orchestrators.json'),
      qer: this.getData<QuantumExecutionResourceDto[]>('QuantumExecutionResources.json'),
      compiler: this.getData('CompilersAndTranspilers.json'),
      qcs: this.getData('CloudServices.json'),
      sdk: this.getData('SoftwareDevelopmentKits.json'),
      references: this.httpClient.get(this.baseUrl + '/references.bib', {headers: {'Content-Type': 'text/plain'}, responseType: 'text'}).pipe(catchError(RepositoryService.handleError))
    };

    this.expectedCalls = Object.keys(observables).length; // The number of calls we are doing

    return new Promise<RepositoryModel>((resolve, reject) => {
      for (const key in observables) {
        observables[key].subscribe(value => this.updateAndResolve(value, key, resolve));
      }
    });
  }


  /**
   * Checks whether the calls have finished and if so, fires resolve.
   * @param value The value to set
   * @param param The parameter in {@link REPOSITORY_STATE} to set.
   * @param resolve The resolve function to call if the expected calls have been reached.
   * @private
   */
  private updateAndResolve<T>(value: T, param: string, resolve: (a: RepositoryModel | PromiseLike<RepositoryModel>) => void): void {
    REPOSITORY_STATE[param].next(value);
    this.conductedCalls++;
    if (this.conductedCalls >= this.expectedCalls) {
      this.conductedCalls = 0;
      resolve(REPOSITORY_STATE);
    }
  }
}
