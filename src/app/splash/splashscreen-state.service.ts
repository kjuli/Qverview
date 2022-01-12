import { Injectable } from '@angular/core';
import {Subject, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SplashscreenStateService {
  private subject = new Subject<boolean>();

  public subscribe(onNext: (value: boolean) => void): Subscription {
    return this.subject.subscribe(onNext);
  }

  public stop(): void {
    this.subject.next(false);
  }
}
