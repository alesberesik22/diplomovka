import React from "react";
import '../../App.css';
import WeatherDashCard from '../WeatherDashCard'


import { motion } from "framer-motion";

export const WeatherIcons = {

}

export default function Home() {
    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
        <WeatherDashCard/>
        </motion.div>
    );
}