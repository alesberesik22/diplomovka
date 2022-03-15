import React, { useEffect, useState } from "react";
import "./AddDevice.css";
import { db } from "./firebase_conf";

function AddDevice() {
  const [zigbeeDevices, setZigbeeDevices] = useState([{}]);

  const getZigbeeDevices = () => {
    console.log("Som tu");
    db.collection("Automation")
      .doc("zigbeeDevices")
      .onSnapshot((docSnapshot) => {
        setZigbeeDevices(docSnapshot.data().list);
      });
    console.log(zigbeeDevices);
  };

  useEffect(() => {
    getZigbeeDevices();
  }, []);

  return (
    <div className="app-container">
      <table>
        <thead>
          <th>Manufacturer</th>
          <th>Friendly name</th>
          <th>Model</th>
        </thead>
        <tbody>
          {zigbeeDevices.map((zigbeeDevice) => (
            <tr>
              <td>{zigbeeDevice.manufacturer}</td>
              <td>{zigbeeDevice.friendlyName}</td>
              <td>{zigbeeDevice.model}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AddDevice;
