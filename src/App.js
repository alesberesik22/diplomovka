import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

import { AnimatePresence } from "framer-motion";

import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Izby from "./components/pages/Izby";
import Pocasie from "./components/pages/Pocasie";
import livingroom from "./components/pages/livingroom";
import bedroom from "./components/pages/bedroom";
import kitchen from "./components/pages/kitchen";
import bathroom from "./components/pages/bathroom";
import ToDo from "./components/pages/ToDo";
import { db } from "./components/firebase_conf";

var prach, teplota, vlhkost, intenzitaSvetla, zrazky, tlak;

function App() {
  // document.body.style.overflow='hidden'
  document.body.classList.add("no-sroll");

  const getPosts = async () => {
    try {
      const userPosts = await axios.get(
        "https://api.thingspeak.com/channels/1024756/feeds.json?results=2"
      );
      console.log("Reload every 10sec");
      console.log(userPosts.data.feeds[0]);
      prach = userPosts.data.feeds[0].field5;
      teplota = userPosts.data.feeds[0].field1;
      vlhkost = userPosts.data.feeds[0].field2;
      intenzitaSvetla = userPosts.data.feeds[0].field3;
      zrazky = userPosts.data.feeds[0].field4;
      tlak = userPosts.data.feeds[0].field6;
      if (teplota != null) {
        db.collection("Weather").doc("ls4DRvAxQOkldD357s9L").update({
          vlhkost: vlhkost,
        });
      }
      if (vlhkost != null) {
        db.collection("Weather").doc("ls4DRvAxQOkldD357s9L").update({
          teplota: teplota,
        });
      }
      if (intenzitaSvetla != null) {
        db.collection("Weather").doc("ls4DRvAxQOkldD357s9L").update({
          intenzitaSvetla: intenzitaSvetla,
        });
      }
      if (zrazky != null) {
        db.collection("Weather").doc("ls4DRvAxQOkldD357s9L").update({
          zrazky: zrazky,
        });
      }
      if (prach != null) {
        db.collection("Weather").doc("ls4DRvAxQOkldD357s9L").update({
          prach: prach,
        });
      }
      if (tlak != null) {
        db.collection("Weather").doc("ls4DRvAxQOkldD357s9L").update({
          tlak: tlak,
        });
      }

      localStorage.setItem("temperature", prach);
      console.log(prach);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getPosts();
    const interval = setInterval(() => {
      getPosts();
    }, 10000);

    return () => clearImmediate(interval);
  });

  // axios.get("https://api.thingspeak.com/channels/1024756/feeds.json?results=2").then((response) =>{
  //   console.log(response.data.feeds[0].field5);
  // })

  return (
    <Router>
      <Navbar />
      <AnimatePresence>
        {" "}
        //dokoncit framer-motion
        https://www.youtube.com/watch?v=YxLMAk2H3ns&t=148s&ab_channel=CodeSnap
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/pocasie" exact component={Pocasie} />
          <Route path="/izby" exact component={Izby} />
          <Route path="/livingroom" exact component={livingroom} />
          <Route path="/bedroom" exact component={bedroom} />
          <Route path="/kitchen" exact component={kitchen} />
          <Route path="/bathroom" exact component={bathroom} />
          <Route path="/ToDo" exact component={ToDo} />
        </Switch>
      </AnimatePresence>
    </Router>
  );
}

export default App;
