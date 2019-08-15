import { Component } from '@angular/core';
import {HubService} from '../hub.service';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent {
  public currentCount = 0;
  public lines: string[];
  constructor(private hc: HubService) {
    hc.addLines.subscribe(o => {
      this.lines.push;
    })
  }
  public incrementCounter() {
    this.currentCount++;
  }
}
