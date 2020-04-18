import React from "react";
import { AddPlayers } from "./AddPlayers";
import { Button } from "reactstrap";
import { Hand } from "./Hand";

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

    render() {
        return (
            <div className="game" >
                <h1>Judgement</h1>
                <AddPlayers cards={this.state.cards} players={this.state.players} addPlayer={this.addPlayer} />
                {this.state.players.length >= 5 ? <Button className="btn btn-block btn-lg btn-success mb-4 col-md-5" onClick={this.getCards} >Start game</Button> : null}
                {this.state.cards && Object.keys(this.state.cards).length ?

                    // <Player players={this.state.players} cards={this.state.cards} />
                    <div className="container">
                        <div className="row" >
                            {this.state.players.map(player => (
                                <div >
                                    {<Hand player={player.text} cards={this.state.cards} />}
                                </div>

                            ))
                            }
                        </div>
                    </div>

                    : null}

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
