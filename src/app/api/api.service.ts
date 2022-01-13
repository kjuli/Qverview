import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {fromFetch} from "rxjs/fetch";
import API_STATE, {ApiModel, ApiParameters} from './api.model';
import {ProgrammingLanguageDto} from '../programming-language/programming-language.model';
import {OrchestratorDto} from '../orchestrator/orchestrator.model';
import {QuantumExecutionResourceDto} from '../quantum-execution-resource/quantum-execution-resource.model';
import {SplashscreenStateService} from '../splash/splashscreen-state.service';

/**
 * This service provides a way to receive the necessary
 * data.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public static readonly DEFAULT_BRANCH = 'https://raw.githubusercontent.com/kjuli/QverviewData/master';

  private expectedCalls: number;
  private conductedCalls = 0;

  /**
   * The base url.
   */
  baseUrl: string = ApiService.DEFAULT_BRANCH;

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
      catchError(ApiService.handleError)
    );
  }

  public getAllData(baseUrl?: string): Promise<ApiModel> {
    this.conductedCalls = 0;
    if (baseUrl) {
      this.baseUrl = baseUrl;
    }

    const observables: ApiParameters = {
      programmingLanguage: this.getData<ProgrammingLanguageDto[]>('ProgrammingLanguages.json'),
      orchestrator: this.getData<OrchestratorDto[]>('Orchestrators.json'),
      qer: this.getData<QuantumExecutionResourceDto[]>('QuantumExecutionResources.json'),
      compiler: this.getData('CompilersAndTranspilers.json'),
      qcs: this.getData('CloudServices.json'),
      sdk: this.getData('SoftwareDevelopmentKits.json')
    };

    this.expectedCalls = Object.keys(observables).length; // The number of calls we are doing

    return new Promise<ApiModel>((resolve, reject) => {
      for (const key in observables) {
        observables[key].subscribe(value => this.updateAndResolve(value, key, resolve));
      }
    });
  }


  /**
   * Checks whether the calls have finished and if so, fires resolve.
   * @param value The value to set
   * @param param The parameter in {@link API_STATE} to set.
   * @param resolve The resolve function to call if the expected calls have been reached.
   * @private
   */
  private updateAndResolve<T>(value: T, param: string, resolve: (a: ApiModel | PromiseLike<ApiModel>) => void): void {
    API_STATE[param].next(value);
    this.conductedCalls++;
    if (this.conductedCalls >= this.expectedCalls) {
      this.conductedCalls = 0;
      resolve(API_STATE);
    }
  }
}
