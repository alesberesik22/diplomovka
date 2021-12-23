import React from "react";
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

export const WeatherIcons = {};
export default function Home() {
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [backgroundColor2, setBackgroundColor2] = useState("");
  const [backgroundColor3, setBackgroundColor3] = useState("");
  const [backgroundColor4, setBackgroundColor4] = useState("");
  const [name, setName] = useState("locked");
  const [electricity, setElectricity] = useState(30);

  const handleChecked = (event) => {};

  const handleClick = (event) => {
    if (event.target.id == "B1") {
      console.log("ID ", event.target.id);
      console.log("Checked: ", !checked);
      setChecked(!checked);
      checked ? setBackgroundColor("") : setBackgroundColor("#1888ff");
    }
    if (event.target.id == "B2") {
      console.log("Checked2: ", !checked2);
      console.log("ID ", event.target.id);
      setChecked2(!checked2);
      checked2 ? setBackgroundColor2("") : setBackgroundColor2("#1888ff");
    }
    if (event.target.id == "B3") {
      console.log("Checked3: ", !checked3);
      console.log("ID ", event.target.id);
      setChecked3(!checked3);
      checked3 ? setBackgroundColor3("") : setBackgroundColor3("#1888ff");
    }
    if (event.target.id == "B4") {
      console.log("Checked4: ", !checked4);
      console.log("ID ", event.target.id);
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
              <div className="diplay-lock-value">{name}</div>
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
