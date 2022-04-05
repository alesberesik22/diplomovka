import React, { useState } from "react";
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
import pressure from "../images/weatherImages/pressure.png";
import humidity from "../images/weatherImages/humidity.png";
import lightIntensity from "../images/weatherImages/lightIntensity.png";
import dust from "../images/weatherImages/dust.png";
import { db } from "../firebase_conf";

var intenzitaSvetla, prach, temperature, tlak, vlhkost, zrazky;

export default function Pocasie() {
  const [poc, setWeather] = useState([]);

  const getWeather = () => {
    db.collection("Weather").onSnapshot(function (querySnapshot) {
      setWeather(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          intenzitaSvetla: doc.data().intenzitaSvetla,
          prach: doc.data().prach,
          teplota: doc.data().teplota,
          tlak: doc.data().tlak,
          vlhkost: doc.data().vlhkost,
          zrazky: doc.data().zrazky,
        }))
      );
    });
  };

  //temperature = localStorage.getItem("temperature");
  console.log("ini temperature");
  console.log(temperature);
  //**************************************************************novy useEffect()*******************************************************************************
  useEffect(() => {
    getWeather();
  }, []); //blank to run only on first launch
  //**************************************************************stary useEffect()******************************************************************************
  // useEffect(() => {
  //   temperature = localStorage.getItem("temperature");
  //   const interval = setInterval(() => {
  //     temperature = localStorage.getItem("temperature");
  //     console.log(temperature);
  //   }, 10000);

  //   return () => clearImmediate(interval);
  // });
  //**************************************************************************************************************************************************************

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
      {poc.map((poc) => (
        <div className="main-slider-container">
          <MdChevronLeft
            size={40}
            className="slider-icon left"
            onClick={slideLeft}
          />
          <div id="slider">
            <WeatherCard
              weather="Teplota"
              id="teplota"
              value={poc.teplota + " °C"}
              image={highTemperature}
            />
            <WeatherCard
              weather="Vlhkost"
              id="humidity"
              value={poc.vlhkost + " %"}
              image={humidity}
            />
            <WeatherCard
              weather="Tlak"
              id="pressure"
              value={poc.tlak + " ps"}
              image={pressure}
            />
            <WeatherCard
              weather="Zrazky"
              id="rain"
              value={poc.zrazky}
              image={rain}
            />
            <WeatherCard
              weather="Intenzita svetla"
              id="clouds"
              value={poc.intenzitaSvetla + " "}
              image={lightIntensity}
            />
            <WeatherCard
              weather="Znecistenie"
              id="dust"
              value={poc.teplota + ""}
              image={dust}
            />
          </div>
          <MdChevronRight
            size={40}
            className="slider-icon right"
            onClick={slideRight}
          />
        </div>
      ))}
    </div>
  );
}
