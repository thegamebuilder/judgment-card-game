import React from "react";
import { AddPlayer } from "./addPlayer";
import { PlayingCard } from "./PlayingCard";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
  Card,
} from "reactstrap";

class GameComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      showWelcome: true,
      currentRound: 10,
    };
    this.addPlayer = this.addPlayer.bind(this);
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

  render() {
    let card = ["2D", "3S", "AS", "KC", "JH"];

    let cards = [];
    card.forEach((element) => {
      cards.push(<PlayingCard card={element} />);
    });

    return (
      <div>
        <div className="row">{cards}</div>

        {this.state.showWelcome ? (
          <div>
            <h1>Judgement</h1>
            <AddPlayer
              players={this.state.players}
              addPlayer={this.addPlayer}
            />
            {this.state.players.length >= 5 ? (
              <Button className="btn btn-block btn-lg btn-success mb-4 col-md-5">
                Start game
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

export default GameComponent;
