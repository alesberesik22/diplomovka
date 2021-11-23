import React from "react";
import CircularSlider from '@fseehawer/react-circular-slider';

import { db } from "./firebase_conf";

function ValueCircularSlider() {
  return (
    <CircularSlider
      value={this.state.value}
      onChange={(value) => this.setState({ value })}
      min={0}
      max={255}
      label="Osvetlenie"
    />
  );
}

export default ValueCircularSlider;
