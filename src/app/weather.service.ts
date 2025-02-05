import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  imgPath: string = 'images/';
  constructor(private http: HttpClient) {}
  public response:any;
  weather() {
    this.http.get('https://yahoo-weather5.p.rapidapi.com/weather?location=sunnyvale&format=json&u=f',
    {
      headers: {
        'x-rapidapi-key':
          '8a152d384amsh6ec58d1b6763541p1ca1adjsn572f1e7421ac',
        'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com',
      } 
    }).subscribe(data => {
        this.response = data;
        console.log(data);
    })
  }
}