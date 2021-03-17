import React, { useState } from "react";
import DisplayWeather from "./DisplayWeather";
import APIKEY from "./fetchWeather.js";
import "./weather.css";

function Weather() {
  const [weather, setWeather] = useState([]);
  const [form, setForm] = useState({
    city: "",
  });

  async function weatherData(e) {
    e.preventDefault();
    if (form.city == "") {
      alert("Add values");
    } else {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city}&APPID=${APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => data);

      setWeather({ data: data });
    }
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name == "city") {
      setForm({ ...form, city: value });
    }
    
  };

  const clearSearch = (e) => {
    this.setState(prev => {
      return {
      city: "",
      input: false,
      data: []
    }})
  }

  return (
    <div className="weather">
      <span className="title">GetWeather Details</span>
      <br />
      <form>
        <input
          type="text"
          placeholder="Search by city..."
          name="city"
          onChange={(e) => handleChange(e)}
        />
        <button className="getweather" onClick={(e) => weatherData(e)} >
          Search
        </button>
        <button className="getweather" onClick={(e) => clearSearch(e)} >
          Clear
        </button>
      </form>

      {weather.data != undefined ? (
        <div>
          <DisplayWeather data={weather.data} />
        </div>
      ) : null}
    </div>
  );
}

export default Weather;
