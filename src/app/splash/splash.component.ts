import { Component, OnInit } from '@angular/core';
import {SplashscreenStateService} from './splashscreen-state.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {
  public opacityChange = 1;
  public splashTransition: string;
  public showSplash = true;

  public readonly ANIMATION_DURATION = 1;

  constructor(private splashScreenStateService: SplashscreenStateService) { }

  ngOnInit(): void {
    this.splashScreenStateService.subscribe(res => {
      this.hideSplashAnimation();
    });
  }

  private hideSplashAnimation() {
    this.splashTransition = `opacity ${this.ANIMATION_DURATION}s`;
    this.opacityChange = 0;

    setTimeout(() => {
      this.showSplash = !this.showSplash;
    }, 500);
  }
}
