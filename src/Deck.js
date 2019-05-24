import React, { Component } from "react";
import Card from "./Card";
import "./Deck.css";
import axios from "axios";

const API_BASE_URL = `${"https://cors-anywhere.herokuapp.com/"}https://deckofcardsapi.com/api/deck/`;
export default class Deck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: null,
      drawn: []
    };
    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    let deck = await axios.get(`${API_BASE_URL}new/shuffle`);
    this.setState({ deck: deck.data });
  }
  async getCard() {
    let id = this.state.deck.deck_id;
    try {
      let cardUrl = `${API_BASE_URL}${id}/draw/`;
      let cardRes = await axios.get(cardUrl);
      if (!cardRes.data.success) {
        throw new Error("No card remaining!");
      }
      let card = cardRes.data.cards[0];
      this.setState(prevState => ({
        drawn: [
          ...prevState.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.value} of ${card.suit} `
          }
        ]
      }));
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const cards = this.state.drawn.map(card => (
      <Card image={card.image} alt={card.name} key={card.id} />
    ));
    return (
      <div className="Deck">
        <h1 className="Deck-title">⬩ Card Dealer ⬩</h1>
        <h2 className="Deck-title Deck-subtitle">
          ⬩ A little demo made with React ⬩
        </h2>
        <button className='Deck-btn' onClick={this.getCard}>Get Card!</button>
        <div className="Deck-cardarea">{cards}</div>
      </div>
    );
  }
}
