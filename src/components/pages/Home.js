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
import { ListItem, ListItemText } from "@mui/material";
import Button from "@mui/material/Button";
import UseAnimations from "react-useanimations";
import toggle from "react-useanimations/lib/toggle";
import lock from "react-useanimations/lib/lock";

import { db } from "../firebase_conf";

export const WeatherIcons = {};
export default function Home() {
  const [checked, setChecked] = useState([]);
  const [visibleRainAlarm, setVisibleRainAlarm] = useState(true);
  const [visibleTemperatureAlarm, setVisibleTemperatureAlarm] = useState(true);
  const [visibleWindAlarm, setVisibleWindAlarm] = useState(true);
  const [visibleLightAlarm, setVisibleLightAlarm] = useState(true);
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

  useEffect(() => {
    getDoorInfo();
    getAutomationInfo();
  }, []); //blank to run only on first launch

  const getDoorInfo = () => {
    db.collection("Devices")
      .doc("door-lock")
      .onSnapshot((docSnapshot) => {
        setDoorLock(docSnapshot.data().locked);
      });
  };

  const getAutomationInfo = () => {
    db.collection("Automation")
      .doc("nUgRm4cQUvxvuB4N9Jqi")
      .onSnapshot((docSnapshot) => {
        setChecked(docSnapshot.data().on);
      });
    db.collection("Automation")
      .doc("rainAlarm")
      .onSnapshot((docSnapshot) => {
        setChecked2(docSnapshot.data().on);
      });
    db.collection("Automation")
      .doc("temperatureAlarm")
      .onSnapshot((docSnapshot) => {
        setChecked3(docSnapshot.data().on);
      });
    db.collection("Automation")
      .doc("windAlarm")
      .onSnapshot((docSnapshot) => {
        setChecked4(docSnapshot.data().on);
      });
  };

  const handleChecked = (event) => {};

  const handleClick = (event) => {
    if (event.target.id == "B1") {
      console.log("ID ", event.target.id);
      console.log("Checked: ", !checked);
      db.collection("Automation").doc("nUgRm4cQUvxvuB4N9Jqi").update({
        on: !checked,
      });
      setChecked(!checked);
      checked ? setBackgroundColor("") : setBackgroundColor("#1888ff");
    }
    if (event.target.id == "B2") {
      console.log("Checked2: ", !checked2);
      console.log("ID ", event.target.id);
      db.collection("Automation").doc("rainAlarm").update({
        on: !checked2,
      });
      setChecked2(!checked2);
      checked2 ? setBackgroundColor2("") : setBackgroundColor2("#1888ff");
    }
    if (event.target.id == "B3") {
      console.log("Checked3: ", !checked3);
      console.log("ID ", event.target.id);
      db.collection("Automation").doc("temperatureAlarm").update({
        on: !checked3,
      });
      setChecked3(!checked3);
      checked3 ? setBackgroundColor3("") : setBackgroundColor3("#1888ff");
    }
    if (event.target.id == "B4") {
      console.log("Checked4: ", !checked4);
      console.log("ID ", event.target.id);
      db.collection("Automation").doc("windAlarm").update({
        on: !checked4,
      });
      setChecked4(!checked4);
      checked4 ? setBackgroundColor4("") : setBackgroundColor4("#1888ff");
    }
  };

  document.body.classList.add("no-sroll");

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 1200;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 1200;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="body">
        <div className="home-container">
          <MdChevronLeft
            size={40}
            className="slider-icon left"
            onClick={slideLeft}
          />
          <div id="slider">
            <div className="karty">
              <WeatherDashCard />
            </div>
            <div className="karta2">
              <ValueSider />
            </div>
            <div className="automation-list">
              <h1>Automation list</h1>
              <div className="automation-element-text">
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
              </div>
            </div>
            <div className="notifications-card">
              <h1 style={{ fontSize: "1.3rem" }}>Notifications</h1>
              <div className="notification-icon">
                <i class="far fa-bell"></i>
              </div>
              {visibleRainAlarm && (
                <div className="rain-notification">
                  Rain alarm
                  <Button id="B8" color="secondary" onClick={handleClick}>
                    {checked ? "ON" : "OFF"}
                  </Button>
                </div>
              )}
              {visibleTemperatureAlarm && (
                <div className="temperature-notification">
                  Temperature alarm
                  <Button id="B9" color="secondary" onClick={handleClick}>
                    {checked ? "ON" : "OFF"}
                  </Button>
                </div>
              )}
              {visibleWindAlarm && (
                <div className="wind-notification">
                  Wind alarm
                  <Button id="B7" color="secondary" onClick={handleClick}>
                    {checked ? "ON" : "OFF"}
                  </Button>
                </div>
              )}
              {visibleLightAlarm && (
                <div className="light-notification">
                  Light alarm
                  <Button id="B1" color="secondary" onClick={handleClick}>
                    {checked ? "ON" : "OFF"}
                  </Button>
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
          <MdChevronRight
            size={40}
            className="slider-icon right"
            onClick={slideRight}
          />
        </div>
      </div>
    </motion.div>
  );
}
