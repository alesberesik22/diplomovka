import React, { useEffect } from "react";
import { useState } from "react";
import "../../App.css";
import "../CardSlider.css";
import "./Home.css";
import WeatherDashCard from "../WeatherDashCard";
import ValueSider from "../ValueSlider";
import WeatherCard from "../WeatherCard";

import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import { motion } from "framer-motion";
import MenuItem from "@mui/material/MenuItem";
import {
  Chip,
  ListItem,
  ListItemText,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import UseAnimations from "react-useanimations";
import toggle from "react-useanimations/lib/toggle";
import lock from "react-useanimations/lib/lock";
import { Modal } from "@mui/material/";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { db } from "../firebase_conf";

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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

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
export const WeatherIcons = {};
export default function Home() {
  const theme = useTheme();
  const [checked, setChecked] = useState([]);
  const [visibleRainAlarm, setVisibleRainAlarm] = useState();
  const [visibleTemperatureAlarm, setVisibleTemperatureAlarm] = useState(true);
  const [visibleWindAlarm, setVisibleWindAlarm] = useState(true);
  const [visibleLightAlarm, setVisibleLightAlarm] = useState(true);
  const [zrazky, setZrazky] = useState([]);
  const [vlhkost, setVlhkost] = useState([]);
  const [prach, setPrach] = useState([]);
  const [tlak, setTlak] = useState([]);
  const [intenzitaSvetla, setIntenzitaSvetla] = useState([]);
  const [teplota, setTeplota] = useState([]);
  const [lowerTemperature, setLowerTemperature] = useState([]);
  const [highTemperature, setHighTemperature] = useState([]);
  const [lightAlarmValue, setLightAlarmValue] = useState([]);
  const [checked2, setChecked2] = useState([]);
  const [checked3, setChecked3] = useState([]);
  const [checked4, setChecked4] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [backgroundColor2, setBackgroundColor2] = useState("");
  const [backgroundColor3, setBackgroundColor3] = useState("");
  const [backgroundColor4, setBackgroundColor4] = useState("");
  const [name, setName] = useState("locked");
  const [electricity, setElectricity] = useState(30);
  const [doorLock, setDoorLock] = useState([]);
  const [temperatureConfirmed, setTemperatureConfirmed] = useState([]);
  const [rainConfirmed, setRainConfirmed] = useState([]);
  const [lightConfirmed, setLightConfirmed] = useState([]);
  const [windConfirmed, setWindConfirmed] = useState([]);

  const [automationListModal, setAutomationListModal] = useState(false);
  const [alarmTypeSelected, setAlarmTypeSelected] = useState("");
  const [addToAlarmList, setAddToAlarmList] = useState(false);
  const [removeFromAlarmList, setRemoveFromAlarmList] = useState(false);

  const [alarmsRemoved, setAlarmsRemoved] = useState([]);
  const [alarmsAdded, setAlarmsAdded] = useState([{}]);

  const [lightAlarmDevices, setLightAlarmDevices] = useState([]);
  const [rainAlarmDevices, setRainAlarmDevices] = useState([]);
  const [temperatureDevices, setTemperatureDevices] = useState([]);

  const [devicesInAlarm, setDevicesInAlarm] = useState([]);
  const [devicesToRemoveSelection, setDevicesToRemoveSelection] = useState([]);

  const [alarmAddedConfirm, setAlarmAddedConfirm] = useState(false);
  const [alarmRemovedFromList, setAlarmRemovedFromList] = useState(false);

  const [allDevices, setAllDevices] = useState([]);

  const [rainAlarmOn, setRainAlarmOn] = useState(false);
  const [lightAlarmOn, setLightAlarmOn] = useState(false);
  const [temperatureAlarmOn, setTemperatureAlarmOn] = useState(false);

  const [alarmToRemove, setAlarmToRemove] = useState([]);

  useEffect(() => {
    getDoorInfo();
    getWeather();
    //getNotificationInfo();
    getAlarmList();
    getAllDevices();
    getAutomationInfo();
  }, []); //blank to run only on first launch

  useEffect(() => {
    console.log("Som tu ");
    getNotificaionRainInfo();
  },[zrazky])

  useEffect(()=> {
    getNotificationsLightInfo();
  },[intenzitaSvetla])

  useEffect(()=> {
    getNotificationTemperatureInfo();
  },[teplota])

  useEffect(() => {
    //var handle = setInterval(getDoorInfo, 6000);
    //var handle3 = setInterval(getWeather, 1000);
    //var handle4 = setInterval(getNotificationInfo, 6000);
    //var handle5 = setInterval(getAlarmList, 6000);
    //var handle6 = setInterval(getAllDevices, 6000);
    //var handle2 = setInterval(getAutomationInfo, 6000);

    return () => {
      //clearInterval(handle);
      //clearInterval(handle2);
      //clearInterval(handle3);
      //clearInterval(handle4);
      //clearInterval(handle5);
      //clearInterval(handle6);
    };
  });

  const getAllDevices = () => {
    db.collection("Automation")
      .doc("devices")
      .onSnapshot((docSnapshot) => {
        setAllDevices(docSnapshot.data().device);
      });
  };

  const getAlarmList = () => {
    db.collection("Automation")
      .doc("alarmList")
      .onSnapshot((docSnapshot) => {
        setAlarmsAdded(docSnapshot.data().list);
      });
  };

  const getDoorInfo = () => {
    db.collection("Devices")
      .doc("door-lock")
      .onSnapshot((docSnapshot) => {
        setDoorLock(docSnapshot.data().locked);
      });
  };

  const getWeather = () => {
    db.collection("Weather")
      .doc("ls4DRvAxQOkldD357s9L")
      .onSnapshot((docSnapshot) => {
        setZrazky(docSnapshot.data().zrazky);
        setIntenzitaSvetla(docSnapshot.data().intenzitaSvetla);
        setTeplota(docSnapshot.data().teplota);
        setVlhkost(docSnapshot.data().vlhkost);
        setPrach(docSnapshot.data().prach);
        setTlak(docSnapshot.data().tlak);
      });
  };

  const getAutomationInfo = () => {
    db.collection("Automation")
      .doc("nUgRm4cQUvxvuB4N9Jqi")
      .onSnapshot((docSnapshot) => {
        setChecked(docSnapshot.data().on);
        setLightConfirmed(docSnapshot.data().confirmed);
        setVisibleLightAlarm(docSnapshot.data().visible);
        setLightAlarmValue(docSnapshot.data().activationValue);
        setLightAlarmDevices(docSnapshot.data().rooms);
      });
    db.collection("Automation")
      .doc("rainAlarm")
      .onSnapshot((docSnapshot) => {
        setChecked2(docSnapshot.data().on);
        setRainConfirmed(docSnapshot.data().confirmed);
        setVisibleRainAlarm(docSnapshot.data().visible);
        setRainAlarmDevices(docSnapshot.data().rooms);
      });
    db.collection("Automation")
      .doc("temperatureAlarm")
      .onSnapshot((docSnapshot) => {
        setChecked3(docSnapshot.data().on);
        setTemperatureConfirmed(docSnapshot.data().confirmed);
        setVisibleTemperatureAlarm(docSnapshot.data().visible);
        setLowerTemperature(docSnapshot.data().lowerValue);
        setHighTemperature(docSnapshot.data().upperValue);
        setTemperatureDevices(docSnapshot.data().rooms);
      });
    db.collection("Automation")
      .doc("windAlarm")
      .onSnapshot((docSnapshot) => {
        setChecked4(docSnapshot.data().on);
        setWindConfirmed(docSnapshot.data().confirmed);
        setVisibleWindAlarm(docSnapshot.data().visible);
      });
  };

  const getNotificaionRainInfo = () => {
    if (zrazky >= 1000) {
      setLightConfirmed(false);
      setVisibleLightAlarm(false);
      db.collection("Automation").doc("rainAlarm").update({
        visible: false,
        confirmed: false,
      });
    }
    if (zrazky < 1000 && rainConfirmed === false) {
      db.collection("Automation").doc("rainAlarm").update({
        visible: true,
      });
      setVisibleRainAlarm(true);
    }
    if (zrazky < 1000 && rainConfirmed === true) {
      console.log("zrazkyposledne");
      db.collection("Automation").doc("rainAlarm").update({
        visible: false,
        confirmed: true,
      });
      setVisibleRainAlarm(false);
    }
  }

  const getNotificationsLightInfo = () => {
    if(intenzitaSvetla > lightAlarmValue)
    {
      db.collection("Automation").doc("nUgRm4cQUvxvuB4N9Jqi").update({
        visible: true,
      });
    }
    if(intenzitaSvetla < lightAlarmValue)
    {
      db.collection("Automation").doc("nUgRm4cQUvxvuB4N9Jqi").update({
        visible: false,
      });
    }

  }

  const getNotificationTemperatureInfo = () => {
    if (
      parseInt(teplota) > parseInt(lowerTemperature) &&
      parseInt(teplota) < parseInt(highTemperature) &&
      checked3 == true &&
      temperatureConfirmed == false
    ) {
      db.collection("Automation").doc("temperatureAlarm").update({
        visible: true,
      });
      setVisibleTemperatureAlarm(true);
    }
    if (
      parseInt(teplota) > parseInt(lowerTemperature) &&
      parseInt(teplota) < parseInt(highTemperature) &&
      checked3 == true &&
      temperatureConfirmed == true
    ) {
      db.collection("Automation").doc("temperatureAlarm").update({
        visible: false,
      });
      setVisibleTemperatureAlarm(false);
    }
    if (
      (parseInt(teplota) < parseInt(lowerTemperature) ||
      parseInt(teplota) > parseInt(highTemperature))
    ) {
      db.collection("Automation").doc("temperatureAlarm").update({
        visible: false,
        confirmed: false,
      });
      setVisibleTemperatureAlarm(false);
    }

  }

  const getNotificationInfo = () => {
    if (zrazky >= 1001) {
      setLightConfirmed(false);
      setVisibleLightAlarm(false);
      db.collection("Automation").doc("rainAlarm").update({
        visible: false,
        confirmed: false,
      });
    }
    // if (intenzitaSvetla < lightAlarmValue) {
    //   setVisibleLightAlarm(false);
    //   setLightConfirmed(false);
    //   db.collection("Automation").doc("nUgRm4cQUvxvuB4N9Jqi").update({
    //     visible: false,
    //     confirmed: false,
    //   });
    // }
    // if (
    //   intenzitaSvetla > lightAlarmValue &&
    //   checked === true &&
    //   lightConfirmed === false
    // ) {
    //   db.collection("Automation").doc("nUgRm4cQUvxvuB4N9Jqi").update({
    //     visible: true,
    //   });
    //   setVisibleLightAlarm(true);
    // }
    // if (
    //   intenzitaSvetla > lightAlarmValue &&
    //   checked === true &&
    //   lightConfirmed === true
    // ) {
    //   setVisibleLightAlarm(false);
    //   db.collection("Automation").doc("nUgRm4cQUvxvuB4N9Jqi").update({
    //     visible: false,
    //   });
    // }
    console.log("zrazky", zrazky);
    console.log("rain confirmed", rainConfirmed);
    if (zrazky < 1000 && rainConfirmed === false) {
      db.collection("Automation").doc("rainAlarm").update({
        visible: true,
      });
      setVisibleRainAlarm(true);
    }
    if (zrazky < 1000 && rainConfirmed === true) {
      console.log("zrazkyposledne");
      db.collection("Automation").doc("rainAlarm").update({
        visible: false,
        confirmed: false,
      });
      setVisibleRainAlarm(false);
    }
    if (
      parseInt(teplota) > parseInt(lowerTemperature) &&
      parseInt(teplota) < parseInt(highTemperature) &&
      checked3 == true &&
      temperatureConfirmed == false
    ) {
      db.collection("Automation").doc("temperatureAlarm").update({
        visible: true,
      });
      setVisibleTemperatureAlarm(true);
    }
    if (
      parseInt(teplota) > parseInt(lowerTemperature) &&
      parseInt(teplota) < parseInt(highTemperature) &&
      checked3 == true &&
      temperatureConfirmed == true
    ) {
      db.collection("Automation").doc("temperatureAlarm").update({
        visible: false,
      });
      setVisibleTemperatureAlarm(false);
    }
  };
  const handleAddAutomationList = (event) => {
    setAutomationListModal(true);
    if (event.target.id === "addToAlarmList") {
      setAddToAlarmList(true);
      setRemoveFromAlarmList(false);
    }
    if (event.target.id === "removeFromAlarmButton") {
      setRemoveFromAlarmList(true);
      setAddToAlarmList(false);
    }
    if (event.target.id === "confirmAdd") {
      var name = "";
      //alarmsAdded.push([{ name: "test", id: "B20" }]);
      db.collection("Automation")
        .doc(String(alarmsRemoved[0]))
        .onSnapshot((docSnapshot) => {
          name = docSnapshot.data().id;
        });
      var fullName = "";
      if (alarmTypeSelected === "Light") {
        fullName = "Light alarm " + alarmsRemoved[0];
      }
      if (alarmTypeSelected === "Rain") {
        fullName = "Rain alarm " + alarmsRemoved[0];
      }
      if (alarmTypeSelected === "Temperature") {
        fullName = "Temperature alarm " + alarmsRemoved[0];
      }
      setAlarmsAdded([
        ...alarmsAdded,
        { name: fullName, id: alarmsRemoved[0], alarmType: alarmTypeSelected },
      ]);

      setAlarmAddedConfirm(true);
      setAlarmsRemoved([]);
      setAlarmTypeSelected("");
    }
    if (event.target.id === "removeFromAlarmButton") {
    }
    if (event.target.id === "removeDeviceFromAlarmList") {
      console.log("before remove", alarmsAdded);
      setAlarmsAdded(
        alarmsAdded.filter((item) => item.id !== alarmToRemove[0])
      );
      setAlarmRemovedFromList(true);
      setAlarmToRemove([]);
    }
  };
  useEffect(() => {
    if (alarmAddedConfirm === true) {
      db.collection("Automation").doc("alarmList").set({
        list: alarmsAdded,
      });
    }
    setAlarmAddedConfirm(false);
  }, [alarmAddedConfirm]);

  useEffect(() => {
    if (alarmRemovedFromList === true) {
      console.log("removed", alarmsAdded);
      db.collection("Automation").doc("alarmList").set({
        list: alarmsAdded,
      });
    }
    setAlarmRemovedFromList(false);
  }, [alarmRemovedFromList]);

  const handleCloseModal = () => {
    setAddToAlarmList(false);
    setRemoveFromAlarmList(false);
    setAutomationListModal(false);
    setRemoveFromAlarmList(false);
    setAddToAlarmList(false);
  };

  const handleAlarmTypeSelected = (event) => {
    setAlarmTypeSelected(event.target.value);
    setDevicesInAlarm([]);
  };

  const handleRemoveSelectedAlarm = (event) => {
    const {
      target: { value },
    } = event;
    setAlarmsRemoved(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleAlarmsToRemove = (event) => {
    const {
      target: { value },
    } = event;
    setAlarmToRemove(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleClick = (event) => {
    if (event.target.id == "B1") {
      db.collection("Automation").doc("nUgRm4cQUvxvuB4N9Jqi").update({
        on: !checked,
      });
      setChecked(!checked);
      checked ? setBackgroundColor("") : setBackgroundColor("#1888ff");
    }
    if (event.target.id == "B2") {
      db.collection("Automation").doc("rainAlarm").update({
        on: !checked2,
      });
      setChecked2(!checked2);
      checked2 ? setBackgroundColor2("") : setBackgroundColor2("#1888ff");
    }
    if (event.target.id == "B3") {
      db.collection("Automation").doc("temperatureAlarm").update({
        on: !checked3,
      });
      setChecked3(!checked3);
      checked3 ? setBackgroundColor3("") : setBackgroundColor3("#1888ff");
    }
    if (event.target.id == "B4") {
      db.collection("Automation").doc("windAlarm").update({
        on: !checked4,
      });
      setChecked4(!checked4);
      checked4 ? setBackgroundColor4("") : setBackgroundColor4("#1888ff");
    }

    if (event.target.id == "B9") {
      db.collection("Automation").doc("temperatureAlarm").update({
        confirmed: true,
      });
      setTemperatureConfirmed(true);
    }
    if (event.target.id == "B8") {
      db.collection("Automation").doc("rainAlarm").update({
        confirmed: true,
        visible: false,
      });
      setRainConfirmed(true);
    }
    if (event.target.id == "B7") {
      db.collection("Automation").doc("windAlarm").update({
        confirmed: true,
        visible: false,
      });
      setWindConfirmed(true);
    }
    if (event.target.id == "B6") {
      db.collection("Automation").doc("nUgRm4cQUvxvuB4N9Jqi").update({
        confirmed: true,
        visible: false,
      });
      setLightConfirmed(true);
    }
    var key = event.target.id;
    console.log("Key", key);
    alarmsAdded.map((item) => {
      if (key === item.id) {
        db.collection("Automation")
          .doc(key)
          .onSnapshot((docSnapshot) => {
            setLightAlarmOn(docSnapshot.data().lightAlarm);
            setRainAlarmOn(docSnapshot.data().rainAlarm);
            setTemperatureAlarmOn(docSnapshot.data().temperatureAlarmAlarm);
          });
        if (item.alarmType == "Light") {
          if (lightAlarmOn === true) {
            db.collection("Automation").doc(key).update({
              lightAlarm: false,
            });
          }
          if (lightAlarmOn === false) {
            db.collection("Automation").doc(key).update({
              lightAlarm: true,
            });
          }
        }
        if (item.alarmType == "Rain") {
          if (rainAlarmOn === true) {
            db.collection("Automation").doc(key).update({
              rainAlarm: false,
            });
          }
          if (rainAlarmOn === false) {
            db.collection("Automation").doc(key).update({
              rainAlarm: true,
            });
          }
        }
        if (item.alarmType == "Temperature") {
          if (temperatureAlarmOn === true) {
            console.log("Zmena na false");
            db.collection("Automation").doc(key).update({
              temperatureAlarm: false,
            });
          }
          if (temperatureAlarmOn === false) {
            console.log("Zmena na true");
            console.log("Kluc", key);
            db.collection("Automation").doc(key).update({
              temperatureAlarm: true,
            });
          }
        }
      }
    });
    getNotificationInfo();
  };

  document.body.classList.add("no-sroll");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="body">
        <div className="home-container">
          <div className="karty">
            <WeatherDashCard zrazky = {zrazky} teplota = {teplota} intenzitaSvetla = {intenzitaSvetla} prach={prach} vlhkost = {vlhkost} tlak={tlak}/>
          </div>
          <div className="karta2">
            <ValueSider />
          </div>
          <div className="automation-list">
            <h1>Automation list</h1>
            <div
              className="add-Automation-list"
              id="addRemoveAutomationList"
              onClick={handleAddAutomationList}
            >
              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            </div>

            <Modal
              open={automationListModal}
              onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div className="select-automation-list-label">
                  <p style={{ width: "400px" }}>
                    Add or remove elements to list
                  </p>
                </div>
                <div className="add-remove-Automtion-list">
                  <Stack spacing={2} direction="row">
                    <Button
                      variant="contained"
                      id="addToAlarmList"
                      onClick={handleAddAutomationList}
                    >
                      Add
                    </Button>
                    <Button
                      variant="contained"
                      id="removeFromAlarmButton"
                      onClick={handleAddAutomationList}
                    >
                      Remove
                    </Button>
                  </Stack>
                </div>
                <div className="select-device-type">
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                    {addToAlarmList ? (
                      <InputLabel id="demo-simple-select-helper-label">
                        Select device type
                      </InputLabel>
                    ) : null}
                    {addToAlarmList ? (
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={alarmTypeSelected}
                        label="Age"
                        onChange={handleAlarmTypeSelected}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Light"}>Light</MenuItem>
                        <MenuItem value={"Rain"}>Rain</MenuItem>
                        <MenuItem value={"Temperature"}>Temperature</MenuItem>
                      </Select>
                    ) : null}
                  </FormControl>
                </div>
                <div className="add-devices">
                  <FormControl sx={{ m: 1, minWidth: 255 }}>
                    {alarmTypeSelected === "Light" ? (
                      <InputLabel id="demo-multiple-chip-label">
                        Select devices to add
                      </InputLabel>
                    ) : null}
                    {alarmTypeSelected === "Light" ? (
                      <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={alarmsRemoved}
                        onChange={handleRemoveSelectedAlarm}
                        input={
                          <OutlinedInput
                            id="select-multiple-chip"
                            label="Select light"
                          />
                        }
                        renderValue={(selected) => (
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 0.5,
                            }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {lightAlarmDevices.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, devicesInAlarm, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : null}
                  </FormControl>
                  <FormControl sx={{ m: 1, minWidth: 255 }}>
                    {alarmTypeSelected === "Rain" ? (
                      <InputLabel id="demo-multiple-chip-label">
                        Select devices to add
                      </InputLabel>
                    ) : null}
                    {alarmTypeSelected === "Rain" ? (
                      <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={alarmsRemoved}
                        onChange={handleRemoveSelectedAlarm}
                        input={
                          <OutlinedInput
                            id="select-multiple-chip"
                            label="Select rain"
                          />
                        }
                        renderValue={(selected) => (
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 0.5,
                            }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {rainAlarmDevices.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, devicesInAlarm, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : null}
                  </FormControl>
                  <FormControl sx={{ m: 1, minWidth: 255 }}>
                    {alarmTypeSelected === "Temperature" ? (
                      <InputLabel id="demo-multiple-chip-label">
                        Select devices to add
                      </InputLabel>
                    ) : null}
                    {alarmTypeSelected === "Temperature" ? (
                      <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={alarmsRemoved}
                        onChange={handleRemoveSelectedAlarm}
                        input={
                          <OutlinedInput
                            id="select-multiple-chip"
                            label="Select rain"
                          />
                        }
                        renderValue={(selected) => (
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 0.5,
                            }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {temperatureDevices.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, devicesInAlarm, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : null}
                  </FormControl>
                  {addToAlarmList ? (
                    <Button
                      variant="contained"
                      id="confirmAdd"
                      onClick={handleAddAutomationList}
                    >
                      Confirm
                    </Button>
                  ) : null}
                </div>
                <div className="add-devices">
                  <FormControl sx={{ m: 1, minWidth: 255 }}>
                    {removeFromAlarmList ? (
                      <InputLabel id="demo-multiple-chip-label">
                        Select devices to remove
                      </InputLabel>
                    ) : null}
                    {removeFromAlarmList ? (
                      <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={alarmToRemove}
                        onChange={handleAlarmsToRemove}
                        input={
                          <OutlinedInput
                            id="select-multiple-chip"
                            label="Select light"
                          />
                        }
                        renderValue={(selected) => (
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 0.5,
                            }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {allDevices.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, devicesInAlarm, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : null}
                  </FormControl>
                  {removeFromAlarmList ? (
                    <Button
                      variant="contained"
                      id="removeDeviceFromAlarmList"
                      onClick={handleAddAutomationList}
                    >
                      Confirm
                    </Button>
                  ) : null}
                </div>
              </Box>
            </Modal>
            <div className="">
              <div
                className="automation-list-element"
                style={{ backgroundColor: backgroundColor }}
              >
                Auto lights
                <Button id="B1" color="secondary" onClick={handleClick}>
                  {checked ? "ON" : "OFF"}
                </Button>
              </div>
              <div
                className="automation-list-element"
                style={{ backgroundColor: backgroundColor2 }}
              >
                Rain alarm
                <Button id="B2" color="secondary" onClick={handleClick}>
                  {checked2 ? "ON" : "OFF"}
                </Button>
              </div>
              <div
                className="automation-list-element"
                style={{ backgroundColor: backgroundColor3 }}
              >
                Temperature alarm
                <Button id="B3" color="secondary" onClick={handleClick}>
                  {checked3 ? "ON" : "OFF"}
                </Button>
              </div>
              <div
                className="automation-list-element"
                style={{ backgroundColor: backgroundColor4 }}
              >
                Wind alarm
                <Button id="B4" color="secondary" onClick={handleClick}>
                  {checked4 ? "ON" : "OFF"}
                </Button>
              </div>
              {alarmsAdded.map((x, i) => {
                return (
                  <div
                    className="automation-list-element"
                    style={{ backgroundColor: backgroundColor4 }}
                  >
                    {x.name}
                    <Button id={x.id} color="secondary" onClick={handleClick}>
                      {checked4 ? "ON" : "OFF"}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="notifications-card">
            <h1 style={{ fontSize: "1.3rem" }}>Notifications</h1>
            <div className="notification-icon">
              <i class="far fa-bell"></i>
            </div>
            {visibleRainAlarm && (
              <div className="rain-notification">
                Rain alert
                <Button id="B8" color="secondary" onClick={handleClick}>
                  {"ACK"}
                </Button>
              </div>
            )}
            {visibleTemperatureAlarm && (
              <div className="temperature-notification">
                Temperature alert
                <Button id="B9" color="secondary" onClick={handleClick}>
                  {"ACK"}
                </Button>
              </div>
            )}
            {visibleWindAlarm && (
              <div className="wind-notification">
                Wind alert
                <Button id="B7" color="secondary" onClick={handleClick}>
                  {"ACK"}
                </Button>
              </div>
            )}
            {visibleLightAlarm && (
              <div className="light-notification">
                Light alert
              </div>
            )}
          </div>
          <div className="door-check-card">
            <h1 style={{ fontSize: "1.4rem" }}>Home door check</h1>
            <div className="door-status">Status of the door: </div>
            <div className="automation-element-toggle">
              <UseAnimations
                animation={lock}
                size={40}
                style={{ padding: 100 }}
              />
            </div>
            <div className="diplay-lock-value">
              {doorLock ? "locked" : "unlocked"}
            </div>
          </div>
          <div className="electricity-card">
            <h1 style={{ fontSize: "1.4rem" }}>Living room electricity</h1>
            <div className="electricity-logo">
              <i class="fas fa-bolt"></i>
            </div>
            <div className="electricity-status">Electricity usage: </div>
            <div className="diplay-electricity-value">{electricity}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
