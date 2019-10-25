import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Counter } from './counter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  public initialValue = [12, 5, 7];
  private counterUrl = 'https://lp4asgadot.herokuapp.com/counters/';

  constructor(private http: HttpClient) { }

  reset() {
    this.initialValue = [0, 0, 0];
  }

  increment(position: number): number {
    this.initialValue[position]++;
    return this.initialValue[position];
  }

  getCounterValue(id: number): Observable<Counter> {
    return this.http.get<Counter>(this.counterUrl + id + '.json');
  }
}
