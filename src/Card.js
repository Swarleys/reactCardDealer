import React, { Component } from "react";
import "./Card.css";

export default class Card extends Component {
  constructor(props) {
    super(props);
    let angle = Math.random() * 90 - 45;
    let xPosition = Math.random() * 40 - 20;
    let yPosition = Math.random() * 40 - 20;
    this._transform = `translate(${xPosition}px, ${yPosition}px) rotate(${angle}deg)`;
  }

  render() {
    const { image, name } = this.props;
    return (
      <img
        className="Card"
        src={image}
        alt={name}
        style={{ transform: this._transform }}
      />
    );
  }
}
