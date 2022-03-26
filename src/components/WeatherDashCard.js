import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../App.css";
import "./WeatherDashCard.css";
import humidity from "./images/icons/humidity.svg";
import temperature from "./images/icons/perfect-day.svg";
import pressure from "./images/icons/pressure.svg";
import wind from "./images/icons/wind.svg";
import rain from "./images/icons/rain.svg";
import light from "./images/icons/day.svg";
import dust from "./images/icons/dust.svg";
import { db } from "./firebase_conf";

export const WeatherIcons = {
  Vlhkost: humidity,
  Tlak: pressure,
  Vietor: wind,
  Zrazky: rain,
  Svetlo: light,
  Prach: dust,
};

const InfoContainer = styled.div`
  display: flex;
  margin: 5px 10px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const InfoIcon = styled.img`
  width: 36px;
  height: 36px;
  cursor: pointer;
`;
const InfoLabel = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin: 15px;
  & span {
    font-size: 12px;
    text-transform: capitalize;
  }
`;

const WeatherInfoComponent = (props) => {
  const { name, value } = props;
  return (
    <InfoContainer>
      <InfoIcon src={WeatherIcons[name]} />
      <InfoLabel>
        {value}
        <span>{name}</span>
      </InfoLabel>
    </InfoContainer>
  );
};

function WeatherDashCard(props) {
  const [weather, setWeather] = useState([]);

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

  useEffect(() => {
    getWeather();
  }); //blank to run only on first launch

  return (
    <div className="container">
      <div className="nadpis">Pocasie</div>
      <div className="temperature-value">
        {weather.map((poc) => (
          <div className="value">{poc.teplota} Stupnov</div>
        ))}
        <img className="image" src={temperature} alt="Ikona pocasia" />
      </div>
      <div className="weather-info">Informacie o pocasi</div>
      {weather.map((poc) => (
        <div className="weather-info-container">
          <WeatherInfoComponent name="Vlhkost" value={poc.vlhkost} />
          <WeatherInfoComponent name="Zrazky" value={poc.zrazky} />
          <WeatherInfoComponent name="Tlak" value={poc.tlak} />
          <WeatherInfoComponent name="Prach" value={poc.prach} />
          <WeatherInfoComponent name="Svetlo" value={poc.intenzitaSvetla} />
          <WeatherInfoComponent name="Vietor" value="6 km/h" />
        </div>
      ))}
    </div>
  );
}

export default WeatherDashCard;
