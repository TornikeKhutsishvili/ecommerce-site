import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild
} from '@angular/core';

import {
  Router,
  RouterModule
} from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AlertToasts } from '../toasts/alert-toasts/alert-toasts';
import { loadFull } from "tsparticles";

declare const tsParticles: any;

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterModule,
    AlertToasts
  ],
  templateUrl: './error-page.html',
  styleUrls: ['./error-page.scss']
})
export class ErrorPage implements OnInit, OnDestroy {

  // injects
  private audio: HTMLAudioElement | null = null;
  private router = inject(Router);
  isMuted = signal(true);

  // ViewChild alertToast
  @ViewChild('alertToast') alertToast!: AlertToasts;


  // when init component
  async ngOnInit() {
    this.isMuted = signal(false);
    const isMuted = this.isMuted();
    // particles init
    await loadFull(tsParticles);
    tsParticles.load("tsparticles", {
      background: { color: "#141e30" },
      fpsLimit: 60,
      particles: {
        color: { value: ["#ff005a", "#00fff7"] },
        links: { color: "#ffffff", distance: 120, enable: true, opacity: 0.5, width: 1 },
        move: { enable: true, speed: 2, outModes: { default: "bounce" } },
        number: { value: 70 },
        opacity: { value: 0.5 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 4 } }
      },
      interactivity: {
        events: { onHover: { enable: true, mode: "repulse" }, resize: true },
        modes: { repulse: { distance: 150 } }
      },
      detectRetina: true
    });


    // background music
    this.audio = new Audio('assets/sounds/error-bg.mp3');
    this.audio.loop = true;
    this.audio.volume = 0.4;
    this.audio.muted = isMuted;
    this.audio.play().catch(() => {});
  }


  // mute and unmute
  toggleMute() {
    const audio = this.audio;
    if (!audio) return;

    this.isMuted.update(v => !v);
    audio.muted = this.isMuted();

    if (!audio.muted && audio.paused) {
      audio.play().catch(() => {});
    }
  }


  // when destroy component
  ngOnDestroy() {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
    tsParticles.dom().forEach((p: any) => p.destroy());
  }


  // go to home
  goHome() {
    this.alertToast.openToast('back to home');

    setTimeout(() => {
      this.alertToast.closeToast(),
      this.router.navigate(['/']);
    }, 700);
  }

}
