import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodayComponent } from './today/today.component';
import { WeekComponent } from './week/week.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TodayComponent, WeekComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'YahooWhatherNew';
}
