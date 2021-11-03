import React from "react";
import styled from "styled-components"
import '../App.css'
import './WeatherDashCard.css'
import humidity from './images/icons/humidity.svg'
import temperature from './images/icons/perfect-day.svg'
import pressure from './images/icons/pressure.svg'
import wind from './images/icons/wind.svg'
import rain from './images/icons/rain.svg'
import light from './images/icons/day.svg'
import dust from './images/icons/dust.svg'

export const WeatherIcons = {
    Vlhkost: humidity,
    Tlak: pressure,
    Vietor: wind,
    Zrazky: rain,
    Svetlo: light,
    Prach: dust
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

const WeatherInfoComponent = (props) =>{
    const {name,value} = props;
    return (
        <InfoContainer>
            <InfoIcon src={WeatherIcons[name]} />
            <InfoLabel>
                {value}<span>{name}</span>
            </InfoLabel>
        </InfoContainer>
    )
}

function WeatherDashCard(props) {
    return (
        <div className='container'>
            <div className='nadpis'>Pocasie</div>
            <div className='temperature-value'>
                <div className='value'>30 stupdnov </div>
                <img className = 'image' src={temperature} alt='Ikona pocasia'/>
            </div>
            <div className='weather-info'>Informacie o pocasi</div>
            <div className='weather-info-container'>
                <WeatherInfoComponent name="Vlhkost" value = "90"/>
                <WeatherInfoComponent name="Zrazky" value = "91"/>
                <WeatherInfoComponent name="Tlak" value = "92"/>
                <WeatherInfoComponent name="Prach" value = "93"/>
                <WeatherInfoComponent name="Svetlo" value = "94"/>
                <WeatherInfoComponent name="Vietor" value = "95"/>
            </div>
        </div>
    );
}

export default WeatherDashCard;