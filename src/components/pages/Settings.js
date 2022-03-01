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
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

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
const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Settings() {
  const [click, setClick] = useState();
  const [rainClick, setrainClick] = useState();
  const [rainValue, setRainValue] = useState();
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [weekday, setWeekday] = useState([]);
  const [value, setValue] = useState();
  const [lowerTime, setLowerTime] = useState();
  const [upperTime, setUpperTime] = useState();
  const [electricity, setElectricity] = useState();
  const [weekdayValue, setWeekdayValue] = useState();
  const [plugAutomation, setPlugAutomation] = useState();
  const [temperatureClick, setTemperatureClick] = useState([]);
  const [lowerTemperature, setLowerTemperature] = useState([]);
  const [highTemperature, setHighTemperature] = useState([]);
  const [windValue, setWindValue] = useState();

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "##1888ff" : "##1888ff",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "##1888ff",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

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

  const getAutomationTemperatureAlarmInfo = () => {
    db.collection("Automation")
      .doc("temperatureAlarm")
      .onSnapshot((docSnapshot) => {
        setTemperatureClick(docSnapshot.data().on);
        setLowerTemperature(docSnapshot.data().lowerValue);
        setHighTemperature(docSnapshot.data().upperValue);
      });
  };

  const getAutomationWindAlarmInfo = () => {
    db.collection("Automation")
      .doc("windAlarm")
      .onSnapshot((docSnapshot) => {
        setWindValue(docSnapshot.data().activationValue);
      });
  };

  const getRelayInfo = () => {
    db.collection("Automation")
      .doc("relay")
      .onSnapshot((docSnapshot) => {
        setWeekday(docSnapshot.data().weekdays);
        setLowerTime(docSnapshot.data().fullLowerTime);
        setUpperTime(docSnapshot.data().fullUpperTime);
        setPlugAutomation(docSnapshot.data().automation);
      });
  };

  useEffect(() => {
    getAutomationLightInfo();
    getAutomationRainAlarmInfo();
    getAutomationTemperatureAlarmInfo();
    getAutomationWindAlarmInfo();
    getRelayInfo();
  }, []); //blank to run only on first launch

  const handleClick = () => {
    console.log("click", !click);
    setClick(!click);
    db.collection("Automation").doc("nUgRm4cQUvxvuB4N9Jqi").update({
      on: !click,
    });
  };

  const handleSmartPlugAutomation = () => {
    console.log("plugAutomation", !plugAutomation);
    setPlugAutomation(!plugAutomation);
    db.collection("Automation").doc("relay").update({
      automation: !plugAutomation,
    });
  };

  const handleClickElectricity = () => {
    setElectricity(!electricity);
    db.collection("Automation").doc("relay").update({
      on: !electricity,
    });
  };

  const handleLowerTime = (newValue) => {
    setLowerTime(newValue);
    var splitTime = String(newValue).split(/(\s+)/);
    console.log(splitTime[8]);
    db.collection("Automation").doc("relay").update({
      lowerTime: splitTime[8],
      fullLowerTime: newValue,
    });
  };

  const handleUpperTime = (newValue) => {
    setUpperTime(newValue);
    var splitTime = String(newValue).split(/(\s+)/);
    db.collection("Automation").doc("relay").update({
      upperTime: splitTime[8],
      fullUpperTime: newValue,
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
    db.collection("Automation").doc("temperatureAlarm").update({
      on: !temperatureClick,
    });
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

  const handleWeekdays = (event) => {
    const {
      target: { value },
    } = event;
    setWeekday(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    db.collection("Automation").doc("relay").update({
      weekdays: value,
    });
  };

  const lightIntensityChange = (event) => {
    console.log("Event", event.target.value);
    setValue(event.target.value);
    db.collection("Automation").doc("nUgRm4cQUvxvuB4N9Jqi").update({
      activationValue: event.target.value,
    });
  };

  const rainIntensityChange = (event) => {
    console.log("Event", event.target.value);
    setRainValue(event.target.value);
  };
  const handleLowerTemperatureValue = (event) => {
    console.log("Event ", event.target.value);
    db.collection("Automation").doc("temperatureAlarm").update({
      lowerValue: event.target.value,
    });
  };
  const handleHigherTemperatureValue = (event) => {
    console.log("Event ", event.target.value);
    db.collection("Automation").doc("temperatureAlarm").update({
      upperValue: event.target.value,
    });
  };
  const windValueChange = (event) => {
    console.log("Event: ", event.target.value);
    db.collection("Automation").doc("windAlarm").update({
      activationValue: event.target.value,
    });
  };

  return (
    <div classname="table">
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
              value={parseInt(value)}
              required={true}
              onChange={lightIntensityChange}
            />
          </Box>
        </div>
        <div className="select-lights">
          <FormControl sx={{ m: 1, minWidth: 255 }}>
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
            <FormControl sx={{ m: 1, minWidth: 255 }}>
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
              value={parseInt(lowerTemperature)}
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
              value={parseInt(highTemperature)}
              onChange={handleHigherTemperatureValue}
            />
          </Box>
        </div>
      </div>
      <div className="wind-alarm">
        <h1 className="name">Wind alarm</h1>
        <div className="text-field">
          <Box>
            <TextField
              label={"wind activation value"}
              id="margin-normal"
              margin="normal"
              value={parseInt(windValue)}
              required={true}
              onChange={windValueChange}
            />
          </Box>
        </div>
      </div>
      <div className="relay">
        <h1 className="name">Smart plug</h1>
        <h2 className="automation-on-off">Automation</h2>
        <div className="smart-plug-switch">
          <IOSSwitch
            sx={{ m: 1, left: 100, top: 20 }}
            value={plugAutomation}
            onChange={handleSmartPlugAutomation}
          />
        </div>
        <div className="settings-on-off-icon" onClick={handleClickElectricity}>
          <i
            className={
              electricity ? "fas fa-solid fa-bolt" : "fas fa-thin fa-bolt"
            }
          />
        </div>
        <div className="time-picker">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Select lower time"
              value={lowerTime}
              onChange={handleLowerTime}
              disabled={!plugAutomation}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div className="upper-time-picker">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Select upper time"
              value={upperTime}
              onChange={handleUpperTime}
              disabled={!plugAutomation}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div className="choose-weekdays">
          <FormControl sx={{ m: 1, minWidth: 255 }}>
            <InputLabel id="weekday-selector-label">Select weekdays</InputLabel>
            <Select
              labelId="weekday-selector-label"
              id="weekday-selector"
              multiple
              value={weekday}
              onChange={handleWeekdays}
              disabled={!plugAutomation}
              input={
                <OutlinedInput
                  id="select-multiple-days"
                  label="Select weekdays"
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
              {weekdays.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, weekday, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
}
