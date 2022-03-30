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
      if (!res) {
        this.hideSplashAnimation();
      } else {
        this.showSplashAnimation();
      }
    });
  }

  private hideSplashAnimation(): void {
    if (!this.showSplash) {
      // Splash-Screen already hidden
      return;
    }

    this.splashTransition = `opacity ${this.ANIMATION_DURATION}s`;
    this.opacityChange = 0;

    setTimeout(() => {
      this.showSplash = false;
    }, 500);
  }

  private showSplashAnimation(): void {
    if (this.showSplash) {
      // Splash-Screen already shown
      return;
    }
    this.opacityChange = 1;
    this.splashTransition = 'opacity 0s';
    this.showSplash = true;
  }
}
