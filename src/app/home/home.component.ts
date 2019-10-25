import { Component, OnInit } from '@angular/core';
import { CounterService } from '../counter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'counters';

  constructor(private counterService: CounterService) { }

  ngOnInit() {
  }

  reset() {
    this.counterService.reset();
  }
}
