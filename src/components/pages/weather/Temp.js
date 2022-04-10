import React from 'react'
import './Temp.css'

function Temp(props) {
  return (
    <div className='Temp'>
        <span className='min' style={{color:'#176'}}>{props.minTemp}</span>
        <span className='max' style={{color:'#176'}}>{props.maxTemp}</span>
    </div>
  )
}

export default Temp