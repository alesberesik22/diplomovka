import React from "react";
import { useEffect } from "react";
import "../../App.css";
import "../CardSlider.css";
import "./Pocasie.css";
import CardSlider from "../CardSlider";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import { motion } from "framer-motion";
//https://www.youtube.com/watch?v=LQcgGcLJhvg&ab_channel=MahmoudShehata

import { teplota } from "../../App";
import WeatherCard from "../WeatherCard";

import highTemperature from "../images/weatherImages/highTemperature.png";
import rain from "../images/weatherIcons/Rain-4x.png";

var temperature;

export default function Pocasie() {
  temperature = localStorage.getItem("temperature");
  console.log("ini temperature");
  console.log(temperature);

  useEffect(() => {
    temperature = localStorage.getItem("temperature");
    const interval = setInterval(() => {
      temperature = localStorage.getItem("temperature");
      console.log(temperature);
    }, 10000);

    return () => clearImmediate(interval);
  });

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div className="body">
      <div className="main-slider-container">
        <MdChevronLeft
          size={40}
          className="slider-icon left"
          onClick={slideLeft}
        />
        <div id="slider">
          <WeatherCard
            weather="Teplota"
            id="temperature"
            value={temperature + " °C"}
            image={highTemperature}
          />
          <WeatherCard
            weather="Vlhkost"
            id="humidity"
            value="30 °C"
            image={highTemperature}
          />
          <WeatherCard
            weather="Tlak"
            id="pressure"
            value="30 °C"
            image={highTemperature}
          />
          <WeatherCard weather="Zrazky" id="rain" value="30 °C" image={rain} />
          <WeatherCard
            weather="Intenzita svetla"
            id="clouds"
            value="30 °C"
            image={highTemperature}
          />
          <WeatherCard
            weather="Znecistenie"
            id="dust"
            value="30 °C"
            image={highTemperature}
          />
        </div>
        <MdChevronRight
          size={40}
          className="slider-icon right"
          onClick={slideRight}
        />
      </div>
    </div>
  );
}
