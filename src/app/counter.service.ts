import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Counter } from './counter';
import { Observable, Subscription } from 'rxjs';
import { ActionCableService, Channel } from 'angular2-actioncable';


@Injectable({
  providedIn: 'root'
})
export class CounterService {
  //public initialValue = [12, 5, 7];
  private counterUrl = 'https://lp4asgadot.herokuapp.com/counters/';
  private countersUrl = 'https://lp4asgadot.herokuapp.com/counters.json';

  private counterObservable: Map<number, Observable<Counter>> = new Map()
  subscription: Subscription;

  constructor(private http: HttpClient, private cableService: ActionCableService) {
    // Open a connection and obtain a reference to the channel
    const channel: Channel = this.cableService
      .cable('wss://lp4asgadot.herokuapp.com/cable')
      .channel('CountersChannel', {room : 'Best Room'});
 
    // Subscribe to incoming messages
    this.subscription = channel.received().subscribe(
      message => {
        console.log('Message : ' + message.id);
        this.counterObservable[message.id].emit(message);
      }
    );
  } 

  reset() {
  }

  increment(id: number) { //: Observable<Counter>
    // return this.http.patch<Counter>(this.counterUrl + id + '.json', {});
    this.http.patch<any>('/.netlify/functions/increment', { counterId: id }).subscribe();
  }

  getCounter(id: number): Observable<Counter> {
    //return this.http.get<Counter>(this.counterUrl + id + '.json');
    if (this.counterObservable.has(id)) {
      return this.counterObservable[id];
    } else {
      this.counterObservable[id] = new EventEmitter<Counter>();
    }
    this.http.get<Counter>(this.counterUrl + id + '.json').subscribe(
      (counter) => {
        this.counterObservable[id].emit(counter);
      }
    );
    return this.counterObservable[id];
  }

  getCounters(): Observable<Counter[]> {
    return this.http.get<Counter[]>(this.countersUrl);
  }
}
