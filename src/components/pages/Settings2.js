import React, { useEffect, useState } from "react";
import { db } from "../firebase_conf";

import "./Settings2.css";

import lightIcon from "../images/settingIcons/light.png";
import rainIcon from "../images/settingIcons/rain.png";
import tempIcon from "../images/settingIcons/temperature.jpg";
import windIcon from "../images/settingIcons/wind.png";
import plugIcon from "../images/settingIcons/smartPlug.png";
import deviceIcon from "../images/settingIcons/addDevice.png";

import { Modal } from "@mui/material/";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import { Input } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import firebase, { firestore } from "firebase";
import AddDevice from "../AddDevice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 470,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 10,
  p: 17,
};

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

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
//const names = ["Obyvacka", "Kupelna", "Kuchyna", "Izba", "Chodba"];

function Settings2() {
  return (
    <div className="wrapper">
      <Card img={lightIcon} name="Auto lights" id="1" />

      <Card img={rainIcon} name="Rain alarm" id="2" />
      <Card img={tempIcon} name="Temperature alarm" id="3" />
      <Card img={windIcon} name="Wind alarm" id="4" />
      <Card img={plugIcon} name="Smart plug" id="5" />
      <Card img={deviceIcon} name="Connected ZigBee devices" id="6" />
      <Card img={deviceIcon} name="Add devices" id="7" />
    </div>
  );
}

function Card(props) {
  const theme = useTheme();

  const [click, setClick] = useState();
  const [rainClick, setrainClick] = useState();
  const [rainValue, setRainValue] = useState();
  const [personName, setPersonName] = useState([]);
  const [rainAlarmDevices, setRainAlarmDevices] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [weekday, setWeekday] = useState([]);
  const [deviceTypeSelected, setDeviceTypeSelected] = useState("");
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

  const [openModal, setOpenModal] = useState(false);
  const [temperatureModal, setTemperatureModal] = useState(false);
  const [windModal, setWindModal] = useState(false);
  const [rainModal, setRainModal] = useState(false);
  const [lightModal, setLightModal] = useState(false);
  const [addToAlarmModal, setAddToAlarmModal] = useState(false);
  const [listOfZigbeeModal, setListOfZigbeeModal] = useState(false);

  const [addDevice, setAddDevice] = useState(false);
  const [removeDevice, setRemoveDevice] = useState(false);
  const [deviceToRemove, setDeviceToRemove] = useState([]);

  const [zigbeeName, setZigbeeName] = useState("");
  const [zigbeeCode, setZigbeeCode] = useState("");

  const [names, setNames] = useState([]);

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

  const handleOpenModal = (event) => {
    if (event.target.id === "1") {
      console.log("Prve tlacidlo");
      setLightModal(true);
    }
    if (event.target.id === "2") {
      console.log("Druhe tlacidlo");
      setRainModal(true);
    }
    if (event.target.id === "3") {
      console.log("Tretie tlacidlo");
      setTemperatureModal(true);
    }
    if (event.target.id === "4") {
      console.log("Stvrte tlacidlo");
      setWindModal(true);
    }
    if (event.target.id === "5") {
      console.log("Piate tlacidlo");
      setOpenModal(true);
    }
    if (event.target.id === "6") {
      setListOfZigbeeModal(true);
    }
    if (event.target.id === "7") {
      setAddToAlarmModal(true);
    }
    if (event.target.id === "addDevice") {
      console.log("add device");
      setAddDevice(true);
      setRemoveDevice(false);
    }
    if (event.target.id === "removeDevice") {
      console.log("remove device");
      setRemoveDevice(true);
      setAddDevice(false);
    }
    if (event.target.id === "confirm") {
      console.log("confirm");
      if (deviceTypeSelected === "Light") {
        db.collection("Automation").doc(String(zigbeeCode)).set({
          deviceType: deviceTypeSelected,
          id: zigbeeName,
          color: "",
          intensity: 0,
          off: true,
          doc: zigbeeCode,
          rainAlarm: false,
          lightAlarm: false,
          room: "none",
        });
      }
      if (deviceTypeSelected === "Plug") {
        db.collection("Automation").doc(String(zigbeeCode)).set({
          deviceType: deviceTypeSelected,
          id: zigbeeName,
          off: true,
          doc: zigbeeCode,
          room: "none",
        });
      }
      if (deviceTypeSelected === "Door lock") {
        db.collection("Automation").doc(String(zigbeeCode)).set({
          deviceType: deviceTypeSelected,
          id: zigbeeName,
          off: true,
          doc: zigbeeCode,
          room: "none",
        });
      }
      names.push(zigbeeCode);
      db.collection("Automation").doc("devices").set({
        device: names,
      });
    }
    if (event.target.id === "confirmDelete") {
      var array1 = names.filter((val) => !deviceToRemove.includes(val));
      db.collection("Automation").doc("devices").set({
        device: array1,
      });
      setDeviceToRemove([]);
    }
    setZigbeeCode("");
    setZigbeeName("");
    setDeviceTypeSelected("");
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setTemperatureModal(false);
    setLightModal(false);
    setRainModal(false);
    setWindModal(false);
    setAddToAlarmModal(false);
    setAddDevice(false);
    setRemoveDevice(false);
    setListOfZigbeeModal(false);
  };
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
        setRainAlarmDevices(docSnapshot.data().rooms);
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

  const getAutomationDevices = () => {
    db.collection("Automation")
      .doc("devices")
      .onSnapshot((docSnapshot) => {
        setNames(docSnapshot.data().device);
      });
  };

  useEffect(() => {
    getAutomationLightInfo();
    getAutomationRainAlarmInfo();
    getAutomationTemperatureAlarmInfo();
    getAutomationWindAlarmInfo();
    getRelayInfo();
    getAutomationDevices();
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

  const getAlarmElement = (event) => {
    console.log(event.target.value);
    setZigbeeName(event.target.value);
  };

  const addToAlarmList = (event) => {
    console.log("value", event.target.value);
    //console.log("event key", event.key);
    if (event.key === "Enter") {
      console.log(event.target.value);
      //setNames((oldArray) => [...oldArray, event.target.value]);
      console.log("modal list", names);
      db.collection("Automation").doc("devices").update({
        device: names,
      });
      console.log("modal list", names);
    }
  };

  const handleDeviceTypeSelected = (event) => {
    console.log(event.target.value);
    setDeviceTypeSelected(event.target.value);
  };

  const addZigbeeDevice = (event) => {
    console.log(event.target.value);
    setZigbeeCode(event.target.value);
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

  const handleRemoveModal = (event) => {
    const {
      target: { value },
    } = event;
    setDeviceToRemove(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    console.log(personName);
  };

  const handleRainRooms = (event) => {
    const {
      target: { value },
    } = event;
    setRainAlarmDevices(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    console.log(value);
    db.collection("Automation").doc("rainAlarm").update({
      rooms: value,
    });
  };

  return (
    <div className="card">
      <img src={props.img} className="card__img" />
      <div className="card__body">
        <h3 className="card__name">{props.name}</h3>
        <button className="card__btn" id={props.id} onClick={handleOpenModal}>
          Enter settings
        </button>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="plug-settings">
              <h1 className="name">Smart plug</h1>

              <div
                className="settings-on-off-icon"
                onClick={handleClickElectricity}
              >
                <i
                  className={
                    electricity ? "fas fa-solid fa-bolt" : "fas fa-thin fa-bolt"
                  }
                />
              </div>
              <h2 className="plug-on-off-settings">Automation</h2>
              <div className="smart-plug-switch">
                <IOSSwitch
                  sx={{ m: 1, left: 150, top: -60 }}
                  value={plugAutomation}
                  onChange={handleSmartPlugAutomation}
                />
              </div>
              <div className="time-pick">
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
              <div className="upper-time-pick">
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
              <div className="select-weekdays">
                <FormControl sx={{ m: 1, minWidth: 255 }}>
                  <InputLabel id="weekday-selector-label">
                    Select weekdays
                  </InputLabel>
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
          </Box>
        </Modal>
        <Modal
          open={temperatureModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="temperature-modal">
              <h1 className="name">Temperature alarm</h1>
              <div
                className="settings-on-off-icon"
                onClick={handleTemperatureIcon}
              >
                <i
                  className={
                    temperatureClick
                      ? "fas fa-thermometer-full"
                      : "fas fa-thermometer-empty"
                  }
                />
              </div>
              <div className="low-temperature-field">
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
              <div className="high-temperature-field">
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
          </Box>
        </Modal>
        <Modal
          open={lightModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="light-modal">
              <h1 className="name">Light alarm</h1>
              <div className="settings-on-off-icon" onClick={handleClick}>
                <i
                  className={click ? "fas fa-lightbulb" : "far fa-lightbulb"}
                />
              </div>
              <div className="light-activation-value">
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
                  <InputLabel id="demo-multiple-chip-label">
                    Select lights
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={personName}
                    onChange={handleChange}
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
                        style={getStyles(name, personName, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
      <Modal
        open={rainModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="rain-modal">
            <h1 className="name">Rain alarm</h1>
            <div className="settings-on-off-icon" onClick={handleClickRain}>
              <i className={rainClick ? "fas fa-tint" : "fas fa-tint-slash"} />
            </div>
            <div className="rain-alarms">
              <div className="select-lights">
                <FormControl sx={{ m: 1, minWidth: 255 }}>
                  <InputLabel id="rain-selector-label">
                    Select devices to alarm
                  </InputLabel>
                  <Select
                    labelId="rain-selector-label"
                    id="rain-selector"
                    multiple
                    value={rainAlarmDevices}
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
        </Box>
      </Modal>
      <Modal
        open={windModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="wind-modal">
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
        </Box>
      </Modal>
      <Modal
        open={addToAlarmModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="add-to-alarm">
            <h1 className="name">Add/Remove</h1>
            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                id="addDevice"
                onClick={handleOpenModal}
              >
                Add
              </Button>
              <Button
                variant="contained"
                id="removeDevice"
                onClick={handleOpenModal}
              >
                Remove
              </Button>
            </Stack>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              {addDevice ? (
                <InputLabel id="demo-simple-select-helper-label">
                  Device type
                </InputLabel>
              ) : null}
              {addDevice ? (
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={deviceTypeSelected}
                  label="Select device type"
                  onChange={handleDeviceTypeSelected}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Light"}>Light</MenuItem>
                  <MenuItem value={"Plug"}>Plug</MenuItem>
                  <MenuItem value={"Door lock"}>Door lock</MenuItem>
                </Select>
              ) : null}
            </FormControl>
            {addDevice ? (
              <Box>
                <TextField
                  label={"Zigbee code of device"}
                  id="margin-normal"
                  margin="normal"
                  value={zigbeeCode}
                  onChange={addZigbeeDevice}
                />
              </Box>
            ) : null}
            {addDevice ? (
              <Box>
                <TextField
                  label={"Name of device"}
                  id="margin-normal"
                  margin="normal"
                  value={zigbeeName}
                  onChange={getAlarmElement}
                />
              </Box>
            ) : null}
            {addDevice ? (
              <Button
                variant="contained"
                id="confirm"
                onClick={handleOpenModal}
              >
                Confirm
              </Button>
            ) : null}
          </div>
          {removeDevice ? (
            <div className="remove-devices">
              <FormControl sx={{ m: 1, minWidth: 255 }}>
                <InputLabel id="demo-multiple-chip-label">
                  Select devices to remove
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={deviceToRemove}
                  onChange={handleRemoveModal}
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
                      style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                id="confirmDelete"
                onClick={handleOpenModal}
              >
                Confirm
              </Button>
            </div>
          ) : null}
        </Box>
      </Modal>
      <Modal
        open={listOfZigbeeModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddDevice />
        </Box>
      </Modal>
    </div>
  );
}

export default Settings2;
