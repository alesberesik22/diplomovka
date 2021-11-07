import React from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

import { AnimatePresence } from 'framer-motion';


import './App.css';

import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Izby from './components/pages/Izby';
import Pocasie from './components/pages/Pocasie';
import livingroom from './components/pages/livingroom';
import bedroom from './components/pages/bedroom';
import kitchen from './components/pages/kitchen';
import bathroom from './components/pages/bathroom';

var temperature;

function App() {

  document.body.style.overflow='hidden'

  const getPosts = async () => {
  try {
    const userPosts = await axios.get("https://api.thingspeak.com/channels/1024756/feeds.json?results=2")
    console.log("Reload every 10sec")
    temperature = userPosts.data.feeds[0].field5
    localStorage.setItem('temperature',temperature);
    console.log(temperature);
  
  } catch (err) {
    console.error(err.message);
  }
};
    useEffect(()=>{
      getPosts()
      const interval =setInterval (() =>{
        getPosts()
      },10000)
      
      return () =>clearImmediate(interval)
})

    // axios.get("https://api.thingspeak.com/channels/1024756/feeds.json?results=2").then((response) =>{
    //   console.log(response.data.feeds[0].field5);
    // })



  return(
  <Router>
        <Navbar/>
        <AnimatePresence> //dokoncit framer-motion https://www.youtube.com/watch?v=YxLMAk2H3ns&t=148s&ab_channel=CodeSnap
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/pocasie' exact component={Pocasie} />
          <Route path='/izby' exact component={Izby} />
          <Route path = '/livingroom' exact component={livingroom}/>
          <Route path = '/bedroom' exact component={bedroom}/>
          <Route path = '/kitchen' exact component={kitchen}/>
          <Route path = '/bathroom' exact component={bathroom}/>
        </Switch>
        </AnimatePresence>
  </Router>
  );
};

export default App;
