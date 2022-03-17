import { Injectable } from '@angular/core';
import {AppConfig} from './app-config.model';
import {HttpClient} from '@angular/common/http';
import config from '../../assets/config/config.json';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  static settings: AppConfig;
  constructor() { }

  load(): Promise<void> {
    const jsonFile = `assets/config/config.json`;
    return new Promise<void>((resolve, reject) => {
      // this.http.get(jsonFile).toPromise().then((response: AppConfig) => {
      //   AppConfigService.settings = response;
      //   resolve();
      // }).catch((response: any) => {
      //   reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
      // });

      AppConfigService.settings = config;
      resolve();
    });
  }
}
