import React from "react";
import "../App.css";
import "./LightControll.css";

import CircularSlider from "@fseehawer/react-circular-slider";
import CircularColor from "react-circular-color";

import Switch from "@mui/material/Switch";

function LightControll(props) {
  const handleColorChange = (color) => {
    console.log("Farba :" + color);
  };
  const handleLightIntensity = (intensity) => {
    console.log("Intenzita: " + intensity);
  };
  const getValue = (e, val) => {
    console.log(val);
  };

  return (
    <div className="container">
      <div className="switch-light">
        <Switch
          onChange={getValue}
          inputProps={{ "aria-label": "controlled" }}
        />
      </div>
      <div className="lightPicker">
        <CircularColor
          size={350}
          onChange={handleColorChange}
          color={"#00cfff"}
        />
      </div>
      <div className="valuePicker">
        <CircularSlider
          onChange={handleLightIntensity}
          dataIndex={50}
          min={0}
          max={100}
          label="Osvetlenie"
          width={180}
        />
      </div>
    </div>
  );
}

export default LightControll;
