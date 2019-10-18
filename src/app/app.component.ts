import { Component } from '@angular/core';
import { CounterComponent } from './counter/counter.component';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'counters';
  
  constructor(private counterService: CounterService) {}

  reset() {
    this.counterService.reset();
  }
}
