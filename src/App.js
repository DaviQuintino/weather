import { HiMiniMagnifyingGlassCircle } from "react-icons/hi2";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TiWeatherWindy } from "react-icons/ti";
import { IoWater } from "react-icons/io5";
import './styles.css';
import { useState } from "react";

const apiKey = process.env.REACT_APP_KEY


function App() {
  const [cidade, setCidade] = useState("");
  const [weatherData, setWeatherData] = useState(null)

  const handleClick = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&lang=pt_br&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
        console.log(data)
      })
      .catch(error => {
        console.error('Erro ao chamar a API:', error);
      });
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div className="App">
      <div className="form">
        <h1>Confira o clima de uma cidade</h1>
        <div className="form-input-container">
          <input
            type="text"
            placeholder="Digite o nome da Cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleClick}>
            <HiMiniMagnifyingGlassCircle />
          </button>
        </div>
      </div>
      <div id="weather-data">
        {weatherData && (
          <>
            <h1>
              <FaMapMarkerAlt />
              <span id="city">{weatherData.name}</span>
              <img src={`https://flagsapi.com/${weatherData.sys.country}/flat/64.png`} alt="bandeira" id="pais" />
            </h1>
            <p id="temperatura">
              <span>{Math.round(weatherData.main.temp)}</span>&deg;C
            </p>
            <div className="descricao">
              <p id="descricao">{weatherData.weather[0].description}
                <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="condição" id="weather-icon" />
              </p>
            </div>
            <div id="detalhes">
              <p id="umidade">
                <IoWater />
                <span>{weatherData.main.humidity} %</span>
              </p>
              <p>
                <TiWeatherWindy />
                <span>{Math.round(weatherData.wind.speed)} km/h</span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;