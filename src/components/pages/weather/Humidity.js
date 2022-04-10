import React from 'react'
import WeatherBody from './WeatherBody'
import './Temperature.css'

class Humidity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp:[],
      city:null,
      isLoaded:false
    };
  }
  componentDidMount() {
    // 
    fetch("https://api.weatherbit.io/v2.0/forecast/daily?city=Kysucke%20Nove%20Mesto&country=SK&key=653751607c6140788d3a432df60e5222")
      .then((res) => res.json())
      .then((json) => {

        this.setState({
          temp: json.data,
          city: json.city_name,
          isLoaded:true
        });
      })
  }
  render() {
    if(!this.state.isLoaded) {
      return (<div><h1>Wait some time...</h1></div>); 
    }

    const humidity = this.state.temp.map(el => {
      return parseInt(el.rh);
    })
    const icon = this.state.temp.map(el=> {
      return String(el.weather.code);
    })
    const description = this.state.temp.map(el => {
      return el.weather.description;
    })
    const date = this.state.temp.map(el => {
      var fulldate = String(el.valid_date);
      var response = fulldate.substring(fulldate.indexOf("-"));
      response = response.substring(1);
      return response;
    })
    
  return (
    <div className="Temperature">
      Humidity forecast
      <div className='weatherContainer pt -3 pb-3'>
        <WeatherBody day={date[0]} icon={icon[0]} minTemp={humidity[0]} description={description[0]}/>
        <WeatherBody day={date[1]} icon={icon[1]} minTemp={humidity[1]} description={description[1]}/>
        <WeatherBody day={date[2]} icon={icon[2]} minTemp={humidity[2]} description={description[2]}/>
        <WeatherBody day={date[3]} icon={icon[3]} minTemp={humidity[3]} description={description[3]}/>
        <WeatherBody day={date[4]} icon={icon[4]} minTemp={humidity[4]} description={description[4]}/>
      </div>
    </div>
  );
}
};


export default Humidity