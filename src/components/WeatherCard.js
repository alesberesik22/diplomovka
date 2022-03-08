import React from "react";
import { useHistory } from "react-router-dom";

import "../App.css";
import "./WeatherCard.css";
import "./CardSlider.css";

function WeatherCard(props) {
  let history = useHistory();
  const routeChange = () => {
    let path = props.id;
    history.push(path);
  };

  return (
    <div className="slider-card" id={props.id} onClick={routeChange}>
      <h1 className="weather">{props.weather}</h1>
      <img className="image" src={props.image} alt="Ikona pocasia" />
      <h1 className="value">{props.value}</h1>
    </div>
  );
}

export default WeatherCard;
