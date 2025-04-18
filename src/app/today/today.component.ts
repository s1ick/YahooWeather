import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { CommonModule } from '@angular/common';
import { WeatherResponse } from '../weather.interface';

@Component({
  selector: 'app-today',
  standalone: true,
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
  imports: [CommonModule]
})
export class TodayComponent implements OnInit {
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

  convertToCelsius(temp: number): number {
    return Math.round((temp - 32) * 5 / 9);
  }

  getWeatherImageUrl(code: string): string {
    return this.weatherService.getWeatherImageUrl(code);
  }
}
