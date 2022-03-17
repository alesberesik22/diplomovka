import React, { useEffect, useState } from "react";
import { db } from "./firebase_conf";

import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import "./Plug.css";

function Plug(props) {
  const [on, setOn] = useState(false);
  const [name, setName] = useState("");
  const [useColor, setUseColor] = useState({ color: "#eee" });

  const handleClick = () => {
    setOn(!on);
    console.log("on", on);
    on ? setUseColor({ color: "#1888ff" }) : setUseColor({ color: "#eee" });
    db.collection(props.collection).doc(props.doc).update({
      off: on,
    });
  };

  const getDeviceInfo = () => {
    db.collection(props.collection)
      .doc(props.doc)
      .onSnapshot((docSnapshot) => {
        setOn(docSnapshot.data().off);
        setName(docSnapshot.data().id);
      });
  };

  useEffect(() => {
    getDeviceInfo();
  }, []);

  return (
    <div className="plugContainer">
      <h1>{props.name}</h1>
      <div class="power-switch" onClick={handleClick}>
        <FontAwesomeIcon
          icon={faPowerOff}
          className="switch"
          style={useColor}
        ></FontAwesomeIcon>
      </div>
    </div>
  );
}

export default Plug;
