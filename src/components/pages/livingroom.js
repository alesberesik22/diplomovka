import React, { isValidElement, useEffect, useState } from "react";
import LightControll from "../LightControll";
import "./livingroom.css";
import "../../App.css";

import { db } from "../firebase_conf";

import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Plug from "../Plug";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 485,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 5,
  borderRadius: 4,
  p: 17,
};

export default function Livingroom() {
  const [displayLight, setDisplayLight] = useState(false);
  const [displayPlug, setDisplayPlug] = useState(false);

  const [sendPlugToDB, setSendPlugToDB] = useState(false);
  const [sendToDB, setSendToDB] = useState(false);
  const [removeFromDB, setRemoveFromDB] = useState(false);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);

  const [deviceSelectedToAdd, setDeviceSelectedToAdd] = useState("");
  const [deviceSelectedToRemove, setDeviceSelectedToRemove] = useState("");

  const [lightDevices, setLightDevices] = useState([{}]);
  const [plugDevices, setPlugDevices] = useState([{}]);
  const [devices, setDevices] = useState([]);
  const [allDevices, setAllDevices] = useState([{}]);

  const getDevices = () => {
    db.collection("Automation")
      .doc("devices")
      .onSnapshot((docSnapshot) => {
        setDevices(docSnapshot.data().device);
      });
    db.collection("Automation")
      .doc("livingroom")
      .onSnapshot((docSnapshot) => {
        setLightDevices(docSnapshot.data().list);
      });
    db.collection("Automation")
      .doc("livingroom")
      .onSnapshot((docSnapshot) => {
        setPlugDevices(docSnapshot.data().listPlug);
      });
    db.collection("Automation")
      .doc("livingroom")
      .onSnapshot((docSnapshot) => {
        setAllDevices(docSnapshot.data().list);
        setAllDevices([...allDevices, docSnapshot.data().listPlug]);
      });
  };

  const handleAddDevices = () => {
    console.log("test");
    setOpenAddModal(true);
  };
  const handleCloseModal = () => {
    setOpenAddModal(false);
    setOpenRemoveModal(false);
  };

  const handleRemoveDevices = () => {
    setOpenRemoveModal(true);
  };

  const handleDeviceToAdd = (event) => {
    setDeviceSelectedToAdd(event.target.value);
  };

  const handleDeviceToRemove = (event) => {
    setDeviceSelectedToRemove(event.target.value);
  };

  const confirmAddDevice = () => {
    console.log(deviceSelectedToAdd);

    db.collection("Automation")
      .doc(deviceSelectedToAdd)
      .onSnapshot((docSnapshot) => {
        if (docSnapshot.data().deviceType === "Light") {
          setDisplayLight(true);
        }
        if (docSnapshot.data().deviceType === "Plug") {
          setDisplayPlug(true);
        }
      });
  };

  const confirmRemoveDevice = () => {
    if (plugDevices.some((name) => name.doc.includes(deviceSelectedToRemove))) {
      console.log("ano");
      setPlugDevices(
        plugDevices.filter((item) => item.doc !== deviceSelectedToRemove)
      );
      setRemoveFromDB(true);
    }
    if (
      lightDevices.some((name) => name.doc.includes(deviceSelectedToRemove))
    ) {
      console.log("ano light");
      setLightDevices(
        lightDevices.filter((item) => item.doc !== deviceSelectedToRemove)
      );
      setRemoveFromDB(true);
    }
  };

  useEffect(() => {
    if (removeFromDB === true) {
      db.collection("Automation").doc("livingroom").set({
        list: lightDevices,
        listPlug: plugDevices,
      });
    }
    setRemoveFromDB(false);
  }, [removeFromDB]);

  useEffect(() => {
    if (displayLight === true) {
      if (lightDevices[0].doc === undefined) {
        console.log("empty");
        db.collection("Automation")
          .doc(deviceSelectedToAdd)
          .onSnapshot((docSnapshot) => {
            if (docSnapshot.data().deviceType === "Light") {
              setLightDevices([
                {
                  color: docSnapshot.data().color,
                  doc: docSnapshot.data().doc,
                  intensity: docSnapshot.data().intensity,
                  off: docSnapshot.data().off,
                  id: docSnapshot.data().id,
                  deviceType: docSnapshot.data().deviceType,
                },
              ]);
            }
          });
      } else {
        console.log("not empty");
        db.collection("Automation")
          .doc(deviceSelectedToAdd)
          .onSnapshot((docSnapshot) => {
            if (docSnapshot.data().deviceType === "Light") {
              setLightDevices([
                ...lightDevices,
                {
                  color: docSnapshot.data().color,
                  doc: docSnapshot.data().doc,
                  intensity: docSnapshot.data().intensity,
                  off: docSnapshot.data().off,
                  id: docSnapshot.data().id,
                },
              ]);
            }
          });
      }
    }
    setDisplayLight(false);
    setSendToDB(true);
    console.log(lightDevices);
  }, [displayLight]);

  useEffect(() => {
    if (displayPlug === true) {
      db.collection("Automation")
        .doc(deviceSelectedToAdd)
        .onSnapshot((docSnapshot) => {
          if (plugDevices[0].doc === undefined) {
            setPlugDevices([
              {
                doc: docSnapshot.data().doc,
                id: docSnapshot.data().id,
                off: docSnapshot.data().off,
              },
            ]);
          } else {
            setPlugDevices([
              ...plugDevices,
              {
                doc: docSnapshot.data().doc,
                id: docSnapshot.data().id,
                off: docSnapshot.data().off,
              },
            ]);
          }
        });
    }
    setSendPlugToDB(true);
    setDisplayPlug(false);
  }, [displayPlug]);

  useEffect(() => {
    if (sendPlugToDB === true) {
      db.collection("Automation").doc("livingroom").set({
        list: lightDevices,
        listPlug: plugDevices,
      });
    }
    setSendPlugToDB(false);
  }, [sendPlugToDB]);

  useEffect(() => {
    if (sendToDB === true) {
      db.collection("Automation").doc("livingroom").set({
        list: lightDevices,
        listPlug: plugDevices,
      });
    }
    setSendToDB(false);
  }, [sendToDB]);

  useEffect(() => {
    getDevices();
  }, []);

  return (
    <div>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab color="primary" aria-label="add" onClick={handleAddDevices}>
          <AddIcon />
        </Fab>
        <Fab color="primary" aria-label="remove" onClick={handleRemoveDevices}>
          <RemoveIcon />
        </Fab>
      </Box>
      <Modal
        open={openRemoveModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Remove devices
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={deviceSelectedToRemove}
                label="Age"
                onChange={handleDeviceToRemove}
              >
                {plugDevices.map((device) => (
                  <MenuItem value={device.doc}>{device.id}</MenuItem>
                ))}
                {lightDevices.map((device) => (
                  <MenuItem value={device.doc}>{device.id}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Button onClick={confirmRemoveDevice}>Remove</Button>
        </Box>
      </Modal>
      <Modal
        open={openAddModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Add devices</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={deviceSelectedToAdd}
                label="Age"
                onChange={handleDeviceToAdd}
              >
                {devices.map((device) => (
                  <MenuItem value={device}>{device}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Button onClick={confirmAddDevice}>Confirm</Button>
        </Box>
      </Modal>
      {lightDevices[0].doc !== undefined
        ? lightDevices.map((device) => {
            return (
              <div className="lightCardsFloat">
                <LightControll
                  doc={device.doc}
                  collection="Automation"
                ></LightControll>
              </div>
            );
          })
        : null}
      {plugDevices[0].doc !== undefined
        ? plugDevices.map((device) => {
            return (
              <div className="lightCardsFloat">
                <Plug
                  doc={device.doc}
                  collection="Automation"
                  name={device.id}
                ></Plug>
              </div>
            );
          })
        : null}
      <div className="lightCardsFloat">
        <LightControll
          doc="VgkSjvc6cnNYmfBOT3vJ"
          collection="Devices"
        ></LightControll>
      </div>
      <div className="lightCardsFloat"></div>
    </div>
  );
}
