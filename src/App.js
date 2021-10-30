import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Axios from 'axios';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Izby from './components/pages/Izby';
import Pocasie from './components/pages/Pocasie';
import livingroom from './components/pages/livingroom';
import bedroom from './components/pages/bedroom';
import kitchen from './components/pages/kitchen';
import bathroom from './components/pages/bathroom';


function App() {

    Axios.get("https://api.thingspeak.com/channels/1024756/feeds.json?results=2").then((response) =>{
      console.log(response.data.feeds[0].field5);
    })


  return(
  <Router>
        <Navbar/>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/pocasie' exact component={Pocasie} />
          <Route path='/izby' exact component={Izby} />
          <Route path = '/livingroom' exact component={livingroom}/>
          <Route path = '/bedroom' exact component={bedroom}/>
          <Route path = '/kitchen' exact component={kitchen}/>
          <Route path = '/bathroom' exact component={bathroom}/>
        </Switch>
  </Router>
  );
};

export default App;
