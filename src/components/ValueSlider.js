import React from "react";
import { useState } from "react";
import "../App.css";
import "./ValueSlider.css";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { MdChevronRight } from "react-icons/md";
import { Modal } from "./Modal";

function ValueSider(props) {
  const [showModal, setShowModal] = useState(false);
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
    console.log("Hodnota nastavenia: ", click);
  };

  const openModal = () => {
    setShowModal((prev) => !prev);
    console.log("Settings was pressed");
  };

  const [lightInt, setLightInt] = useState("");

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setLightInt(newValue);
  };

  const lightSettings = () => {
    console.log("Settings was pressed");
  };

  function preventHorizontalKeyboardNavigation(event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
    }
  }

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
          orientation="vertical"
          defaultValue={0}
          aria-label="Temperature"
          onKeyDown={preventHorizontalKeyboardNavigation}
          onChange={handleChange}
        />
      </Box>
      <div className="on-off-icon" onClick={handleClick}>
        <i className={click ? "fas fa-lightbulb" : "far fa-lightbulb"} />
      </div>
      <MdChevronRight
        size={30}
        className="light-settings-icone"
        onClick={openModal}
      />
      <div className="device-location">Livingroom</div>
      <div className="device-name">Hlavne svetlo</div>
      <Modal showModal={showModal} setShowModal={setShowModal}></Modal>
    </div>
  );
}

export default ValueSider;
