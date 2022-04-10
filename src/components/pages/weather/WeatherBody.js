import React from 'react'
import "./WeatherBody.css";

import Days from './Days';
import Icon from './Icon';
import Temp from './Temp';

function WeatherBody(props) {
  return (
    <div className='WeatherBody-card'>
        <Days day={props.day}/>
        <Icon icon={props.icon}/>
        <Temp minTemp={props.minTemp} maxTemp={props.maxTemp}/>
    </div>
  )
}

export default WeatherBody