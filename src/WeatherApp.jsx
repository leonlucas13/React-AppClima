import { useState } from 'react'
import './WeatherApp.css'

export const WeatherApp = () => {

    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null)

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = '4d8774f7d6272f66462c12ff4e8e8332'
    const difKelvin = 273.15 // Para lograr obtener grados Celsios debemos restar este numero por los grados kelvin.

    //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    //4d8774f7d6272f66462c12ff4e8e8332

    const fechWeatherData = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
            const data = await response.json()
            console.log(data)
            setWeatherData(data)
        } catch (error) {
            console.error('Upsss... ', error)
        }
    }

    const handleCityChange = (event) => {
        setCity(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('HandleSubmit Form')
        console.log(city)
        fechWeatherData()
    }

    return (
        <div className="container">
            <h1>Esta es la App del Clima</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ingresa una Ciudad"
                    value={city}
                    onChange={handleCityChange}
                />
                <button type="submit">Buscar</button>
            </form>

            { weatherData && (
                <div>
                    <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                    <p>La temperatura actual es {Math.floor(weatherData.main.temp - difKelvin)} °C</p>
                    <p>La condicion meteorologica actual: {weatherData.weather[0].description}</p>
                    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
                </div>
            )}

        </div>
    ) 
}
