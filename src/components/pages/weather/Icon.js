import React from 'react'
import "./Icon.css"
import Cloudy from "../../../components/images/icons/cloudy.svg"
import Rain from "../../images/icons/rain.svg"
import Sun from "../../images/icons/sunny.svg"
import Thermometer from "../../images/icons/temp.svg"
import Snow from "../../images/weatherIcons/Snow-2x.png"

function Icon(props) {
  switch(props.icon){
    case '801':
        return <img className='icon' src={Cloudy} alt={Cloudy}/>
        break;
    case '802':
          return <img className='icon' src={Cloudy} alt={Cloudy}/>
          break;
    case '803':
          return <img className='icon' src={Cloudy} alt={Cloudy}/>
          break;
    case '200':
          return <img className='icon' src={Rain} alt={Rain}/>
          break;
    case '201':
          return <img className='icon' src={Rain} alt={Rain}/>
          break;
    case '202':
          return <img className='icon' src={Rain} alt={Rain}/>
          break;
    case '610':
          return <img className='icon' src={Sun} alt={Sun}/>
          break;
    case '600':
          return <img className='icon' src={Snow} alt={Snow}/>
          break;
    case '601':
          return <img className='icon' src={Snow} alt={Snow}/>
          break;
    case '602':
          return <img className='icon' src={Snow} alt={Snow}/>
          break;
    case '603':
          return <img className='icon' src={Snow} alt={Snow}/>
          break;
    default:
        <React.Fragment>
            <img className='icon' src={Thermometer} alt={Thermometer}/>
            <h5>{props.description}</h5>
        </React.Fragment>
        
  }
}

export default Icon