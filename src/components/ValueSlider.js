import React from "react";
import { useState } from "react";
import "../App.css";
import './ValueSlider.css'

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { MdChevronRight } from "react-icons/md";


function ValueSider(props) {

    const [lightInt, setLightInt] = useState('')

    const handleChange = (event, newValue) => {
        console.log(newValue);
        setLightInt(newValue);
    };

    const lightSettings = () => {
        console.log("Settings was pressed");
      };

    function preventHorizontalKeyboardNavigation(event) {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
        }
      }

  return (
      <div className='containerLight'>
          
          <Box sx={{ width: 300, height: 150 }}>
      <Slider
        sx={{
            width:300,
            top:-20,
            left:-13,
          '& input[type="range"]': {
            WebkitAppearance: 'slider-vertical',
          },
        }}
        orientation="vertical"
        defaultValue={30}
        aria-label="Temperature"
        onKeyDown={preventHorizontalKeyboardNavigation}
        onChange ={handleChange}
      />
    </Box>
          <MdChevronRight
          size={30}
          className="light-settings-icone"
          onClick={lightSettings}
        />
      </div>
  );
}

export default ValueSider;