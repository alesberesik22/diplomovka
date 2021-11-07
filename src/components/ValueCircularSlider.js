import React from "react";
import CircularSlider from "react-circular-slider-bar";

function ValueCircularSlider() {
  return (
    <CircularSlider
      value={this.state.value}
      onChange={(value) => this.setState({ value })}
    />
  );
}

export default ValueCircularSlider;
