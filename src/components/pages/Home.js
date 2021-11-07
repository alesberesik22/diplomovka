import React from "react";
import "../../App.css";
import "../CardSlider.css";
import "./Home.css";
import WeatherDashCard from "../WeatherDashCard";
import WeatherCard from "../WeatherCard";

import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import { motion } from "framer-motion";

export const WeatherIcons = {};

export default function Home() {
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
