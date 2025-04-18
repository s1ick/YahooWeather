import { Component, effect, signal } from '@angular/core';
import { TodayComponent } from './today/today.component';
import { WeekComponent } from './week/week.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodayComponent, WeekComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('themeChange', [
      transition('* => *', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AppComponent {
  title = 'YahooWeatherNew';
  isDarkTheme = signal(false);

  constructor() {
    // Эффект для применения темы при изменении сигнала
    effect(() => {
      document.body.classList.toggle('dark-theme', this.isDarkTheme());
    });
  }

  toggleTheme(): void {
    this.isDarkTheme.update(prev => !prev);
  }
}
