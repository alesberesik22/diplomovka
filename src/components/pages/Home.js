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

export const WeatherIcons = {};
export default function Home() {
  const [checked, setChecked] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");
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
      <div className="automation-element-toggle">
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
