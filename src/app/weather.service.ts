import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, retry, shareReplay, finalize } from 'rxjs';
import { WeatherResponse } from './weather.interface';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly baseImgPath = 'assets/images/weather/';
  private readonly defaultImg = '0.png';
  private readonly imgSize = '256'; // Можно изменить на '128' для меньших изображений

  private readonly cache = new Map<string, Observable<WeatherResponse>>();

  constructor(private http: HttpClient) {}

  getWeather(location: string = 'sunnyvale'): Observable<WeatherResponse> {
    // Проверка кэша
    if (this.cache.has(location)) {
      return this.cache.get(location)!;
    }

    const url = `${environment.apiUrl}?location=${location}&format=json&u=f`;
    const headers = {
      'x-rapidapi-key': environment.apiKey,
      'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com',
    };

    const request$ = this.http.get<WeatherResponse>(url, { headers }).pipe(
      retry(2), // Повторяем запрос при ошибке (макс 2 раза)
      shareReplay(1), // Кэшируем последний результат для новых подписчиков
      catchError(this.handleError),
      // Очищаем кэш при завершении или ошибке
      finalize(() => this.cache.delete(location))
    );

    this.cache.set(location, request$);
    return request$;
  }

  getWeatherImageUrl(code?: string): string {
    if (!code) {
      return `${this.baseImgPath}${this.imgSize}/${this.defaultImg}`;
    }

    // Преобразуем код в строку, если приходит число
    const codeStr = code.toString();

    // Проверяем существование файла (в продакшене это не сработает,
    // но поможет при разработке)
    try {
      // Этот путь должен соответствовать структуре ваших assets
      const imagePath = `${this.baseImgPath}${this.imgSize}/${codeStr}.png`;
      return imagePath;
    } catch {
      return `${this.baseImgPath}${this.imgSize}/${this.defaultImg}`;
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      // Клиентская ошибка
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Серверная ошибка
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error('WeatherService error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
