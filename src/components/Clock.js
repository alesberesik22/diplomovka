import { useState, useEffect } from "react";

function Clock(){

    const [time,setTime] = useState('')
    useEffect (() => {
        
    })

}

function formatTime(val){

    if(val < 10) {
        return '0';
    } else {
        return '';
    }

}

export default Clock;