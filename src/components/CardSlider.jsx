import React from "react";
import "./CardSlider.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import { useHistory } from "react-router-dom";

const CardSlider = (props) => {
  let history = useHistory();

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const redirect = (item) => {
    console.log(item.id);
    history.push(item.id);
  };

  return (
    <div className="main-slider-container">
      <MdChevronLeft
        size={40}
        className="slider-icon left"
        onClick={slideLeft}
      />
      <div id="slider">
        {props.slides.map((slide, index) => {
          return (
            <div
              className="slider-card"
              key={index}
              id={slide.id}
              onClick={redirect.bind(this, slide)}
            >
              <div
                className="slider-card-image"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                }}
              ></div>
              <p className="slider-card-title"> {slide.title}</p>
              <p className="slider-card-description">{slide.description}</p>
            </div>
          );
        })}
      </div>
      <MdChevronRight
        size={40}
        className="slider-icon right"
        onClick={slideRight}
      />
    </div>
  );
};

export default CardSlider;
