import React from "react";
import "../../App.css";
import "./Settings.css";
import { useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const names = ["Obyvacka", "Kupelna", "Kuchyna", "Izba", "Chodba"];

export default function Settings() {
  const [click, setClick] = useState();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleClick = () => {
    console.log("click", !click);
    setClick(!click);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div className="containerLightSettings">
      <div className="settings-on-off-icon" onClick={handleClick}>
        <i className={click ? "fas fa-lightbulb" : "far fa-lightbulb"} />
      </div>
      <div className="text-field">
        <Box>
          <TextField
            label={"light activation value"}
            id="margin-normal"
            margin="normal"
          />
        </Box>
      </div>
      <div className="select-lights">
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-chip-label">Select lights</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={personName}
            onChange={handleChange}
            input={
              <OutlinedInput id="select-multiple-chip" label="Select light" />
            }
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <h1 className="name">Svetla</h1>
    </div>
  );
}
