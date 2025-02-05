import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { WeatherService } from './../weather.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  imports: [CommonModule],
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit, AfterViewInit {
  @ViewChild('button') button!: ElementRef;
  constructor(public WeatherService: WeatherService , private http: HttpClient, ) { 
  }
  public response:any;
  ngOnInit(): void {

  }

  ngAfterViewInit(): void { 
      this.WeatherService.weather();
      //WheatherService.response.current_observation.pubDate
  }
}
