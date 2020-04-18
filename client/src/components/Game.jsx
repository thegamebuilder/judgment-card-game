import React from "react";
import { AddPlayers } from "./AddPlayers";
import { Button } from "reactstrap";
import { Player } from "./Player";
import { PlayingCard } from "./PlayingCard";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      showWelcome: true,
      currentRound: 10,
      cards: {},
      trumps: ["H", "D", "S", "C", "H", "D", "S", "C", "H", "D"],
      currentTrump: "",
    };
    this.addPlayer = this.addPlayer.bind(this);
    this.getCards = this.getCards.bind(this);
  }

  componentDidMount() {
    this.setState({ currentTrump: this.state.trumps[0] });
  }

  addPlayer(playerName) {
    if (playerName.length === 0) {
      return;
    }
    const newItem = {
      text: playerName,
      id: Date.now(),
    };
    this.setState((state) => ({
      players: state.players.concat(newItem),
      text: "",
    }));
  }

  getCards() {
    fetch("http://127.0.0.1:5000/cardDealer", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        round: this.state.trumps.length ? this.state.trumps.length : 1,
        players: this.state.players.map((val) => {
          return val.text;
        }),
      }), // body data type must match "Content-Type" header
    })
      .then((response) => {
        return response.json();
      })
      .then((cards) => {
        console.log(cards, typeof cards); // this will be a string
        this.setState((state) => ({
          cards: cards,
        }));
        console.log(this.state.cards);
      });
  }

  render() {
    return (
      <div>
        <div className="row text-center">
          <div className="col col-md-6  my-auto">
            <AddPlayers
              cards={this.state.cards}
              players={this.state.players}
              addPlayer={this.addPlayer}
            />
          </div>
          <div className="col col-md-6">
            <PlayingCard card={this.state.currentTrump} />
          </div>
        </div>
        <div>
          {this.state.players.length >= 5 ? (
            <Button
              className="btn btn-block btn-lg btn-success mb-4 col-md-5"
              onClick={this.getCards}
            >
              Start game
            </Button>
          ) : null}
          {this.state.cards && Object.keys(this.state.cards).length ? (
            <Player players={this.state.players} cards={this.state.cards} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Game;
