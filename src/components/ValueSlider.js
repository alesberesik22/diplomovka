import React, { useEffect } from "react";
import { useState } from "react";
import "../App.css";
import "./ValueSlider.css";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { MdChevronRight } from "react-icons/md";
import { Modal } from "./Modal";
import { db } from "./firebase_conf";

var svetlo, status;

function ValueSider(props) {
  const [light, setLight] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [click, setClick] = useState();
  const [color, setColor] = useState("");

  useEffect(() => {
    getDeviceInfo();
  }, []); //blank to run only on first launch

  const getDeviceInfo = () => {
    db.collection("Automation")
      .doc("0x588e81fffef768b5")
      .onSnapshot((docSnapshot) => {
        setClick(docSnapshot.data().off);
        setLight(docSnapshot.data().intensity);
        setColor(docSnapshot.data().color);
      });
  };
  //console.log("Light", light);
  //blank to run only on first launch

  const handleClick = () => {
    console.log("click", !click);
    db.collection("Automation").doc("0x588e81fffef768b5").update({
      off: !click,
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

  const sendLight = (event, newValue) => {
    db.collection("Automation").doc("0x588e81fffef768b5").update({
      intensity: newValue,
    });
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
  svetlo = light;
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
          onChangeCommitted={sendLight}
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
