import { Component } from '@angular/core';
import {HubService} from '../hub.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent {
  public currentCount = 0;
  public lines: string[];

  public hs: HubService;
  constructor(private hc: HubService, private http: HttpClient) {
    this.hs = hc;
    this.lines = [];
    this.hs.setupHub(http);
    this.hs.addLines.subscribe(o => {
      o.lines.forEach(l => {
        this.lines.push(l);
      });
    });
    this.hs.addCount.subscribe(a => {
      this.currentCount = a;
    });
  }
  public incrementCounter() {
    this.currentCount++;
  }
}
