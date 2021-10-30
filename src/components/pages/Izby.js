import React from "react";
import '../../App.css';
import '../CardSlider.css'
import CardSlider from "../CardSlider";


export default function Pocasie() {

    const slides =[{image:'https://picsum.photos/320/250',title:"Livingroom", description:'3 zariadenia',id:'/livingroom'},
                  {image:'https://picsum.photos/320/250',title:"Bedroom", description:'4 zriadenia', id:'/bedroom' },
                  {image:'https://picsum.photos/320/250',title:"Kitchen", description:'5 zariadeni', id:'/kitchen' },
                  {image:'https://picsum.photos/320/250',title:"Bathroom", description:'6 zariadeni', id:'/bathroom'},
                  {image:'https://picsum.photos/320/250',title:"Hall", description:'7 zariadeni', id:'/hall'},
                  {image:'https://picsum.photos/320/250',title:"Toto je siesty nazov", description:'Toto je siesty popis'}
];

    return (
        <div className='body'>
            <CardSlider slides={slides} id={slides.id}/>
        </div>
    );
}