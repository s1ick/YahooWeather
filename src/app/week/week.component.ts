import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { CommonModule } from '@angular/common';
import { WeatherResponse } from '../weather.interface';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-week',
  standalone: true,
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss'],
  imports: [CommonModule],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class WeekComponent implements OnInit {
  @Input() isDarkTheme = false;
  weatherData: WeatherResponse | null = null;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.loadWeatherData();
  }

  private loadWeatherData(): void {
    this.weatherService.getWeather().subscribe({
      next: (data: WeatherResponse) => this.weatherData = data,
      error: (err) => console.error('Error loading weather data:', err)
    });
  }

  calculateAverageTemp(high: number, low: number): number {
    return Math.round((high + low) / 2);
  }

  convertToCelsius(temp: number): number {
    return Math.round((temp - 32) * 5 / 9);
  }

  getWeatherImageUrl(code: string): string {
    return this.weatherService.getWeatherImageUrl(code);
  }
}
