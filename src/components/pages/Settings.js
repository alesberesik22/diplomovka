import React from "react";
import "../../App.css";
import "./Settings.css";
import { useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const names = ["Obyvacka", "Kupelna", "Kuchyna", "Izba", "Chodba"];

export default function Settings() {
  const [click, setClick] = useState();
  const [rainClick, setrainClick] = useState();
  const [rainValue, setRainValue] = useState();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [value, setValue] = useState();

  const handleClick = () => {
    console.log("click", !click);
    setClick(!click);
  };
  const handleClickRain = () => {
    console.log("Rain click", !rainClick);
    setrainClick(!rainClick);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    console.log("Value", value);
  };

  const lightIntensityChange = (event) => {
    console.log("Event", event.target.value);
    setValue(event.target.value);
  };

  const rainIntensityChange = (event) => {
    console.log("Event", event.target.value);
    setRainValue(event.target.value);
  };

  return (
    <div>
      <div className="containerLightSettings">
        <div className="settings-on-off-icon" onClick={handleClick}>
          <i className={click ? "fas fa-lightbulb" : "far fa-lightbulb"} />
        </div>
        <div className="text-field">
          <Box>
            <TextField
              label={"light activation value"}
              id="margin-normal"
              margin="normal"
              defaultValue={30}
              required={true}
              onChange={lightIntensityChange}
            />
          </Box>
        </div>
        <div className="select-lights">
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-chip-label">Select lights</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={personName}
              onChange={handleChange}
              input={
                <OutlinedInput id="select-multiple-chip" label="Select light" />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, personName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <h1 className="name">Svetla</h1>
      </div>
      <div className="rain-controll-settings">
        <div className="settings-rain-on-off-icon" onClick={handleClickRain}>
          <i className={rainClick ? "fas fa-tint" : "fas fa-tint-slash"} />
        </div>
        <h1 className="rain-name">Dazd</h1>
        <div className="rain-text-field">
          <Box>
            <TextField
              label={"rain activation value"}
              id="margin-normal"
              margin="normal"
              defaultValue={30}
              required={true}
              onChange={rainIntensityChange}
            />
          </Box>
        </div>
      </div>
    </div>
  );
}
