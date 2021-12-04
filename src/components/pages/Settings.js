import React, { useEffect } from "react";
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
import { db } from "../firebase_conf";
import { Input } from "@mui/material";

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
  const [personName, setPersonName] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [value, setValue] = useState();
  const [temperatureClick, setTemperatureClick] = useState();

  const getAutomationLightInfo = () => {
    db.collection("Automation")
      .doc("nUgRm4cQUvxvuB4N9Jqi")
      .onSnapshot((docSnapshot) => {
        setClick(docSnapshot.data().on);
        setPersonName(docSnapshot.data().rooms);
        setValue(docSnapshot.data().activationValue);
      });
  };

  const getAutomationRainAlarmInfo = () => {
    db.collection("Automation")
      .doc("rainAlarm")
      .onSnapshot((docSnapshot) => {
        setrainClick(docSnapshot.data().on);
        setRooms(docSnapshot.data().rooms);
      });
  };
  useEffect(() => {
    getAutomationLightInfo();
    getAutomationRainAlarmInfo();
  }, []); //blank to run only on first launch

  const handleClick = () => {
    console.log("click", !click);
    setClick(!click);
    db.collection("Automation").doc("nUgRm4cQUvxvuB4N9Jqi").update({
      on: !click,
    });
  };
  const handleClickRain = () => {
    console.log("Rain click", !rainClick);
    setrainClick(!rainClick);
    db.collection("Automation").doc("rainAlarm").update({
      on: !rainClick,
    });
  };
  const handleTemperatureIcon = () => {
    console.log("Temperature click ", !temperatureClick);
    setTemperatureClick(!temperatureClick);
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
    db.collection("Automation").doc("nUgRm4cQUvxvuB4N9Jqi").update({
      rooms: value,
    });
  };
  const handleRainRooms = (event) => {
    const {
      target: { value },
    } = event;
    setRooms(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    db.collection("Automation").doc("rainAlarm").update({
      rooms: value,
    });
  };

  const lightIntensityChange = (event) => {
    console.log("Event", event.target.value);
    setValue(event.target.value);
  };

  const rainIntensityChange = (event) => {
    console.log("Event", event.target.value);
    setRainValue(event.target.value);
  };
  const handleLowerTemperatureValue = (event) => {
    console.log("Event ", event.target.value);
  };
  const handleHigherTemperatureValue = (event) => {
    console.log("Event ", event.target.value);
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
              defaultValue={value}
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
        <h1 className="name">Auto lights</h1>
      </div>
      <div className="rain-controll-settings">
        <div className="settings-rain-on-off-icon" onClick={handleClickRain}>
          <i className={rainClick ? "fas fa-tint" : "fas fa-tint-slash"} />
        </div>
        <h1 className="name">Rain alarm</h1>
        <div className="rain-alarms">
          <div className="select-lights">
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="rain-selector-label">
                Select lights to alarm
              </InputLabel>
              <Select
                labelId="rain-selector-label"
                id="rain-selector"
                multiple
                value={rooms}
                onChange={handleRainRooms}
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    label="Select light"
                  />
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
                    style={getStyles(name, rooms, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <div className="temperature-controll-settings">
        <div className="settings-on-off-icon" onClick={handleTemperatureIcon}>
          <i
            className={
              temperatureClick
                ? "fas fa-thermometer-full"
                : "fas fa-thermometer-empty"
            }
          />
        </div>
        <h1 className="name">Temp alarm</h1>
        <div classname="lower-temperature-input">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            <Input
              placeholder="Lower temperature"
              type={"number"}
              defaultValue={30}
              onChange={handleLowerTemperatureValue}
            />
          </Box>
        </div>
        <div classname="high-temperature-input">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            <Input
              placeholder="High temperature"
              type={"number"}
              defaultValue={100}
              onChange={handleHigherTemperatureValue}
            />
          </Box>
        </div>
      </div>
    </div>
  );
}
