import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ApiModel} from '../api/api.model';
import {ApiService} from '../api/api.service';
import {SplashscreenStateService} from '../splash/splashscreen-state.service';

@Injectable({
  providedIn: 'root'
})
export class DataResolver implements Resolve<ApiModel> {

  constructor(private apiService: ApiService, private splashScreenService: SplashscreenStateService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ApiModel> {
    const promise = new Promise<ApiModel>((resolve, reject) => {
      this.apiService.getAllData().then(value => {
        this.splashScreenService.stop();
        resolve(value);
      }).catch(reason => reject(reason));
    });
    return promise;
  }

}
