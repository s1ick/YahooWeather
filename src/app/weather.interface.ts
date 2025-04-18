export interface WeatherResponse {
  location: {
    city: string;
  };
  current_observation: {
    pubDate: number;
    condition: {
      temperature: number;
      code: string;
      text: string;
    };
    atmosphere: {
      humidity: number;
    };
  };
  forecasts: Array<{
    day: string;
    high: number;
    low: number;
    code: string;
    text?: string;
  }>;
}
