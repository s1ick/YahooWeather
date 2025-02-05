export interface WeatherData {
  // Define the structure of the weather data here
  // Example:
  location: {
    city: string;
    country: string;
  };
  current_observation: {
    condition: {
      temperature: number;
      text: string;
    };
  };
  // Add other fields as needed
}