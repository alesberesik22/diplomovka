import React from "react";
import '../App.css'
import './WeatherCard.css'
import './CardSlider.css'


function WeatherCard(props) {
    return (
        <div className='slider-card' id={props.id}>
            <h1 className='weather'>{props.weather}</h1>
            <img className = 'image' src={props.image} alt='Ikona pocasia'/>
            <h1 className='value'>{props.value}</h1>

        </div>
    );
}

export default WeatherCard;