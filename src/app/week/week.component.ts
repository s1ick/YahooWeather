import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-week',
  imports: [CommonModule],
  templateUrl: './week.component.html',
  styleUrl: './week.component.scss'
})
export class WeekComponent {
  constructor(public WeatherService: WeatherService ) { 
  }
  imgPath: string = 'images/';
  ngOnInit(): void {
  }
  ngAfterViewInit(): void { 
    this.WeatherService.weather();
}
ConvertString(value: string){
  return parseFloat(value)
  }
}
