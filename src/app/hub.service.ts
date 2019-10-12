import { Injectable, Inject } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {LineData} from './models/lineModel';

@Injectable({
  providedIn: 'root'
})
export class HubService {

  private hubConnection: HubConnection;
  public addLines = new Subject<LineData>();
  public addCount = new Subject<number>();
  public onConnected = new Subject<boolean>();
  private httpC: HttpClient;
  private uri: string;
  private cnt = 0;

  baseUri: string;
  setupHub(http: HttpClient) {
    this.httpC = http;
    console.log("baseuri: " +  environment.baseUri);
    this.baseUri = environment.baseUri;
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  invoke(command: string, a, b) {
    this.hubConnection.invoke(command, a, b);
  }
  private createConnection() {
    this.uri = this.baseUri + '/logchangehub';
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.uri)
      .configureLogging(LogLevel.Information)
      .build();
  }
  private startConnection() {
    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started!');
        this.onConnected.next(true);
      })
      .catch(err => {
        console.error('Error while establishing connection :(');
      });
  }

  private registerOnServerEvents(): void {
    this.hubConnection.on('AddLines', (fileId: number, lines: string[]) => {
      this.addLines.next({ fileId, lines });
      this.cnt++;
      this.addCount.next(this.cnt);
      console.log("message on addlines: " + fileId);

    });
    console.log("registered addlines");

  }
}

