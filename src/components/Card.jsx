import React from "react";
import "./Card.css"; // Assuming you will create a CSS file for styling

const Card = ({ image }) => {
  return (
    <div className="card">
      <img src={image.url} alt={image.title} className="card-image" />
      <div className="card-title">{image.title}</div>
    </div>
  );
};

export default Card;
