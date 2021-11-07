import React from "react";
import { Redirect } from "react-router";
import "../../App.css";
import ValueCircularSlider from "../ValueCircularSlider";

export default function livingroom() {
  const handleChange = (event) => {
    const value = { ...this.state.value, title: event.target.value };
    this.setState({ value });
  };

  return (
    <div>
      ...my awesome stuff...
      <ValueCircularSlider
        r={50}
        trackWidth={10}
        thumbWidth={10}
        onChange={(value) => console.log(value)}
      />
    </div>
  );
}
