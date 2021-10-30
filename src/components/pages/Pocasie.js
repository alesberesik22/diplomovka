import React from "react";
import '../../App.css';
import '../CardSlider.css'
import CardSlider from "../CardSlider";


export default function Pocasie() {

    const sliderClick = (slider) => {
        console.log(slider.target.id)
    }

    const slides =[{image:'https://picsum.photos/320/250',title:"Livingroom", description:'Toto je popis',id:'/livingroom', clickEvent:sliderClick},
                  {image:'https://picsum.photos/320/250',title:"Toto je druhy nazov", description:'Toto je druhy popis', id:'/bedroom', clickEvent:sliderClick},
                  {image:'https://picsum.photos/320/250',title:"Toto je treti nazov", description:'Toto je treti popis', clickEvent:sliderClick},
                  {image:'https://picsum.photos/320/250',title:"Toto je stvrty nazov", description:'Toto je stvrty popis', clickEvent:sliderClick},
                  {image:'https://picsum.photos/320/250',title:"Toto je piaty nazov", description:'Toto je piaty popis', clickEvent:sliderClick},
                  {image:'https://picsum.photos/320/250',title:"Toto je siesty nazov", description:'Toto je siesty popis', clickEvent:sliderClick}
];

    return (
        <div className='body'>
            <CardSlider slides={slides} id={slides.id}/>
        </div>
    );
}