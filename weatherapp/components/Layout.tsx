import React, { useState, useEffect } from 'react';

interface WeatherProps {
  title?: string;
  defaultCity?: string;
}

const Weather: React.FC<WeatherProps> = ({ title, defaultCity }) => {
  const [city, setCity] = useState(defaultCity);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = '93b04ac2e3dafc69e377e21afa088063';

  const fetchWeatherData = async () => {
    try {
      setLoading(true);

      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  return (
    <div>
      <h2>{title}</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchWeatherData();
        }}
      >
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

      {loading && <p>Loading...</p>}

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

