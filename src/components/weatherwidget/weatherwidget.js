import React from "react";
import { Card } from "react-bootstrap";

export default function WeatherWidget({ weatherData}) {
  return (
    <>
      <Card className="text-center">
        <Card.Header>City : {weatherData.name}</Card.Header>
        {typeof weatherData.main != "undefined" ? (
          <Card.Body>
            <Card.Title>Todays Weather</Card.Title>
            <Card.Text>
              <p>
                Temprature: {weatherData.main.temp} &deg;C Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString("en-IN")} <br />
                Humidity: {weatherData.main.humidity} <br />
                Atmosphere: {weatherData.weather[0].main}
              </p>
            </Card.Text>
          </Card.Body>
        ) : (
          <>{}</>
        )}
        <Card.Footer> Powered By Openweather API</Card.Footer>
      </Card>
    </>
  );
}