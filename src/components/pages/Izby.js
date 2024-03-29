import React from "react";
import "../../App.css";
import "../CardSlider.css";
import CardSlider from "../CardSlider";

import bathroomImg from "../images/bathroom.png";
import bedroomImg from "../images/bedroom.png";
import kitchenImg from "../images/kitchen.png";
import livingroomImg from "../images/livingRoom.png";
import hall from "../images/download.png";

import { motion } from "framer-motion";

export default function Izby() {
  const slides = [
    {
      image: livingroomImg,
      title: "Livingroom",
      description: "3 zariadenia",
      id: "/livingroom",
    },
    {
      image: bedroomImg,
      title: "Bedroom",
      description: "4 zriadenia",
      id: "/bedroom",
    },
    {
      image: kitchenImg,
      title: "Kitchen",
      description: "5 zariadeni",
      id: "/kitchen",
    },
    {
      image: bathroomImg,
      title: "Bathroom",
      description: "6 zariadeni",
      id: "/bathroom",
    },
    {
      image: hall,
      title: "Hall",
      description: "7 zariadeni",
      id: "/hall",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1>Rooms</h1>
      <div className="body">
        <CardSlider slides={slides} id={slides.id} />
      </div>
    </motion.div>
  );
}
