import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
import Hall from "./components/pages/hall";
import kitchen from "./components/pages/kitchen";
import bathroom from "./components/pages/bathroom";
import Humidity from "./components/pages/weather/Humidity";
import Pressure from "./components/pages/weather/Pressure";
import Rain from "./components/pages/weather/Rain";
import ToDo from "./components/pages/ToDo";
import { db } from "./components/firebase_conf";
import Temperature from "./components/pages/weather/Temperature";
import Settings2 from "./components/pages/Settings2";
import Login from "./components/Login";

import firebase from "firebase";

var prach, teplota, vlhkost, intenzitaSvetla, zrazky, tlak;

function App() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // document.body.style.overflow='hidden'
  document.body.classList.add("no-sroll");

  const getPosts = async () => {
    try {
      const userPosts = await axios.get(
        "https://api.thingspeak.com/channels/1024756/feeds.json?results=2"
      );
      if (
        userPosts.data.feeds[0].field5 !== null &&
        prach !== userPosts.data.feeds[0].field5
      ) {
        prach = userPosts.data.feeds[0].field5;
        db.collection("Weather").doc("ls4DRvAxQOkldD357s9L").update({
          prach: prach,
        });
      }
      if (
        userPosts.data.feeds[0].field1 !== null &&
        teplota !== userPosts.data.feeds[0].field1
      ) {
        teplota = userPosts.data.feeds[0].field1;
        db.collection("Weather").doc("ls4DRvAxQOkldD357s9L").update({
          teplota: teplota,
        });
      }
      if (
        userPosts.data.feeds[0].field2 !== null &&
        vlhkost !== userPosts.data.feeds[0].field2
      ) {
        vlhkost = userPosts.data.feeds[0].field2;
        db.collection("Weather").doc("ls4DRvAxQOkldD357s9L").update({
          vlhkost: vlhkost,
        });
      }
      if (
        userPosts.data.feeds[0].field3 !== null &&
        intenzitaSvetla !== userPosts.data.feeds[0].field4
      ) {
        intenzitaSvetla = userPosts.data.feeds[0].field4;
        db.collection("Weather").doc("ls4DRvAxQOkldD357s9L").update({
          intenzitaSvetla: intenzitaSvetla,
        });
      }
      if (
        userPosts.data.feeds[0].field4 !== null &&
        zrazky !== userPosts.data.feeds[0].field3
      ) {
        zrazky = userPosts.data.feeds[0].field3;
        db.collection("Weather").doc("ls4DRvAxQOkldD357s9L").update({
          zrazky: zrazky,
        });
      }
      if (
        userPosts.data.feeds[0].field6 !== null &&
        tlak !== userPosts.data.feeds[0].field6
      ) {
        tlak = userPosts.data.feeds[0].field6;
        db.collection("Weather").doc("ls4DRvAxQOkldD357s9L").update({
          tlak: tlak,
        });
      }

      if (intenzitaSvetla != null) {
      }
      if (zrazky != null) {
      }
      if (prach != null) {
      }
      if (tlak != null) {
      }

      localStorage.setItem("temperature", prach);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getPosts();
    const interval = setInterval(() => {
      //getPosts();
    }, 4000);

    return () => clearImmediate(interval);
  });

  // axios.get("https://api.thingspeak.com/channels/1024756/feeds.json?results=2").then((response) =>{
  //   console.log(response.data.feeds[0].field5);
  // })

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = () => {
    clearErrors();
    clearErrors();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user/disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  const handleSingup = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-alread-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  return (
    <div>
      {user ? (
        <Router>
          <Navbar handleLogout={handleLogout} />
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
              <Route path="/Settings" exact component={Settings2} />
              <Route path="/teplota" exact component={Temperature} />
              <Route path="/settings2" exact component={Settings2} />
              <Route path="/humidity" exact component={Humidity} />
              <Route path="/pressure" exact component={Pressure} />
              <Route path="/rain" exact component={Rain} />
              <Route path="/hall" exact component={Hall} />
            </Switch>
          </AnimatePresence>
        </Router>
      ) : (
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          emailError={emailError}
          passwordError={passwordError}
          handleLogin={handleLogin}
        />
      )}
    </div>
    // <Router>
    //   <Navbar handleLogout={handleLogout} />
    //   <AnimatePresence>
    //     {" "}
    //     //dokoncit framer-motion
    //     https://www.youtube.com/watch?v=YxLMAk2H3ns&t=148s&ab_channel=CodeSnap
    //     <Switch>
    //       <Route path="/" exact component={Home} />
    //       <Route path="/pocasie" exact component={Pocasie} />
    //       <Route path="/izby" exact component={Izby} />
    //       <Route path="/livingroom" exact component={livingroom} />
    //       <Route path="/bedroom" exact component={bedroom} />
    //       <Route path="/kitchen" exact component={kitchen} />
    //       <Route path="/bathroom" exact component={bathroom} />
    //       <Route path="/ToDo" exact component={ToDo} />
    //       <Route path="/Settings" exact component={Settings2} />
    //       <Route path="/teplota" exact component={Temperature} />
    //       <Route path="/settings2" exact component={Settings2} />
    //       {/* <Route path="/login" exact component={Login} /> */}
    //     </Switch>
    //   </AnimatePresence>
    // </Router>
  );
}

export default App;
