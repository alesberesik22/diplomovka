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
import UseAnimations from "react-useanimations";
import toggle from "react-useanimations/lib/toggle";
import lock from "react-useanimations/lib/lock";

export const WeatherIcons = {};
export default function Home() {
  const [checked, setChecked] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [name, setName] = useState("locked");
  const [electricity, setElectricity] = useState(30);
  const homeAutomation = [
    {
      id: 1,
      name: "Auto lights",
    },
    {
      id: 2,
      name: "Rain alarm",
    },
    {
      id: 3,
      name: "Temperature alarm",
    },
    {
      id: 4,
      name: "Wind alarm",
    },
  ];
  const handleChecked = (event) => {
    console.log("Checked: ", !checked);
    console.log("ID ", event.target.id);
    setChecked(!checked);
    checked ? setBackgroundColor("#1888ff") : setBackgroundColor("");
  };
  const homeAutomationList = homeAutomation.map((settings) => (
    <div
      className="automation-element"
      style={{ backgroundColor: backgroundColor }}
    >
      <li>{settings.name}</li>
      <div className="lock-element-toggle">
        <UseAnimations
          animation={toggle}
          size={56}
          onClick={handleChecked}
          reverse={checked}
        />
      </div>
    </div>
  ));
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
                <ListItem>
                  <ListItemText primary={homeAutomationList} />
                </ListItem>
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
