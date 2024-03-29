import React, { useEffect, useState } from "react";
import "../App.css";
import "./LightControll.css";

import CircularSlider from "@fseehawer/react-circular-slider";
import CircularColor from "react-circular-color";

import Switch from "@mui/material/Switch";

import { db } from "./firebase_conf";

var farbaPom = "";

function LightControll(props) {
  const [light, setLight] = useState([]);
  const [farba, setFarba] = useState("");
  const [click, setClick] = useState();

  useEffect(() => {
    getDeviceInfo();
  }, []); //blank to run only on first launch

  const getDeviceInfo = () => {
    db.collection(props.collection)
      .doc(props.doc)
      .onSnapshot((docSnapshot) => {
        setClick(docSnapshot.data().off);
        setLight(docSnapshot.data().intensity);
        setFarba(docSnapshot.data().color);
      });
  };

  const handleColorChange = (color) => {
    console.log("Farba :" + color);
    db.collection(props.collection).doc(props.doc).update({
      color: color,
    });
  };

  const handleLightIntensity = (intensity) => {
    console.log("Intenzita: " + intensity);
    db.collection(props.collection).doc(props.doc).update({
      intensity: intensity,
    });
  };
  const getValue = (e, val) => {
    console.log(val);
    db.collection(props.collection).doc(props.doc).update({
      off: val,
    });
  };
  farbaPom = '"' + farba + '"';
  console.log("Color:", farbaPom);
  return (
    <div className="container">
      <div className="switch-light">
        <Switch
          checked={click}
          onChange={getValue}
          inputProps={{ "aria-label": "controlled" }}
        />
      </div>
      <div className="lightPicker">
        {farba ? (
          <CircularColor
            size={350}
            onChange={handleColorChange}
            color={farba}
          />
        ) : null}
      </div>
      <div className="valuePicker">
        <CircularSlider
          onChange={handleLightIntensity}
          dataIndex={light}
          min={0}
          max={100}
          label="Osvetlenie"
          width={180}
        />
      </div>
    </div>
  );
}

export default LightControll;
