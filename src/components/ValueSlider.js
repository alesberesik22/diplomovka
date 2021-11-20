import React, { useEffect } from "react";
import { useState } from "react";
import "../App.css";
import "./ValueSlider.css";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { MdChevronRight } from "react-icons/md";
import { Modal } from "./Modal";
import { db } from "./firebase_conf";

var svetlo, off;

function ValueSider(props) {
  const getOnOff = () => {
    db.collection("Devices")
      .doc("VgkSjvc6cnNYmfBOT3vJ")
      .onSnapshot((doc) => {
        off = doc.data().off;
      });
  };

  getOnOff();
  const [light, setLight] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [click, setClick] = useState(off);
  console.log("OFF:", off);

  const getWeather = () => {
    db.collection("Devices")
      .doc("VgkSjvc6cnNYmfBOT3vJ")
      .onSnapshot((doc) => {
        setLight(doc.data());
      });
  };
  getWeather();
  useEffect(() => {
    getWeather();
  }); //blank to run only on first launch

  const handleClick = () => {
    setClick(!click);
    off = !off;
    console.log("Hodnota nastavenia: ", off);
    db.collection("Devices").doc("VgkSjvc6cnNYmfBOT3vJ").update({
      off: off,
    });
  };

  const openModal = () => {
    setShowModal((prev) => !prev);
    console.log("Settings was pressed");
  };

  const [lightInt, setLightInt] = useState("");

  const handleChange = (event, newValue) => {
    console.log("Hodnota jasu", newValue);
    setLightInt(newValue);
  };

  const handleDragStop = () => {
    console.log("Drag stop: ");
  };

  const lightSettings = () => {
    console.log("Settings was pressed");
  };

  function preventHorizontalKeyboardNavigation(event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
    }
  }
  svetlo = light.intensity;
  return (
    <div className="containerLight">
      <Box sx={{ width: 300, height: 150 }}>
        <Slider
          sx={{
            width: 300,
            height: 150,
            top: -20,
            left: -13,
            '& input[type="range"]': {
              WebkitAppearance: "slider-vertical",
            },
          }}
          key={`slider-${svetlo}`}
          orientation="vertical"
          defaultValue={svetlo}
          aria-label="Temperature"
          onKeyDown={preventHorizontalKeyboardNavigation}
          onChange={handleChange}
          onDragEnd={handleDragStop}
        />
      </Box>
      <div className="on-off-icon" onClick={handleClick}>
        <i className={click ? "fas fa-lightbulb" : "far fa-lightbulb"} />
      </div>
      <MdChevronRight
        size={30}
        className="light-settings-icone"
        // onClick={openModal}
      />
      <div className="device-location">Livingroom</div>
      <div className="device-name">Hlavne svetlo</div>
      {/* <Modal showModal={showModal} setShowModal={setShowModal}></Modal> */}
    </div>
  );
}

export default ValueSider;
