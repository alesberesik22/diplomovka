import React, { useEffect } from "react";
import { useState } from "react";
import UseAnimations from "react-useanimations";
import lock from "react-useanimations/lib/lock";

import { db } from "./firebase_conf";

import "./DoorSensor.css";

function DoorSensor(props) {
  const [name, setName] = useState("");
  const [doorLock, setDoorLock] = useState();

  const getDeviceInfo = () => {
    db.collection(props.collection)
      .doc(props.doc)
      .onSnapshot((docSnapshot) => {
        setDoorLock(docSnapshot.data().locked);
        setName(docSnapshot.data().id);
      });
  };

  useEffect(() => {
    getDeviceInfo();
  }, []);
  return (
    <div className="door-card">
      <h1 style={{ fontSize: "1.4rem" }}>{props.name} door check</h1>
      <div className="status">Status of the door: </div>
      <div className="automation-element-toggle">
        <UseAnimations animation={lock} size={40} style={{ padding: 100 }} />
      </div>
      <div className="diplay-lock-value">
        {doorLock ? "locked" : "unlocked"}
      </div>
    </div>
  );
}

export default DoorSensor;
