import React from "react";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";


export default function OutlinedCard(props) {

  return (
    <Card className='mainBody' variant="outlined" id = {props.id}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.room}
        </Typography>
        <Typography className='pos' color="textSecondary">
          {props.numberOfDevices}
        </Typography>
      </CardContent>
    </Card>
  );
}
