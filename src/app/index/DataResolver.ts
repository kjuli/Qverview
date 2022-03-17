import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {RepositoryModel} from '../repository/repositoryModel';
import {RepositoryService} from '../repository/repository.service';
import {SplashscreenStateService} from '../splash/splashscreen-state.service';

@Injectable({
  providedIn: 'root'
})
export class DataResolver implements Resolve<RepositoryModel> {

  constructor(private apiService: RepositoryService, private splashScreenService: SplashscreenStateService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<RepositoryModel> {
    const promise = new Promise<RepositoryModel>((resolve, reject) => {
      this.apiService.getAllData().then(value => {
        this.splashScreenService.stop();
        resolve(value);
      }).catch(reason => reject(reason));
    });
    return promise;
  }

}
