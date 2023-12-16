// components/Weather.tsx
import React, { useState } from 'react';

interface WeatherProps {
  defaultCity?: string,
  title?: string;
}

const Weather: React.FC<WeatherProps> = ({ defaultCity = 'New York' }) => {
  const [city, setCity] = useState(defaultCity);
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = '93b04ac2e3dafc69e377e21afa088063';

  const fetchWeatherData = async () => {
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div>
      <h2>Weather App</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="city">Enter City:</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <button type="submit">Get Weather</button>
      </form>

      {weatherData && (
        <div>
          <h3>Current Weather</h3>
          <p>City: {weatherData.name}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Conditions: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
