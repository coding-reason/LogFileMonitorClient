import { Component } from '@angular/core';
import {HubService} from '../hub.service';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent {
  public currentCount = 0;
  public lines: string[];
  public hs: HubService;
  constructor(private hc: HubService) {
    this.hs = hc;
    this.hs.addLines.subscribe(o => {
      this.lines.push;
    });
  }
  public incrementCounter() {
    this.hs.setupHub();
    this.currentCount++;
  }
}
