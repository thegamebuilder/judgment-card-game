import React from "react";
import { AddPlayers } from "./AddPlayers";
import { Button } from "reactstrap";
import { Player } from "./Player";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            showWelcome: true,
            currentRound: 10,
            cards: {}
        };
        this.addPlayer = this.addPlayer.bind(this);
        this.getCards = this.getCards.bind(this);
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
        fetch('http://127.0.0.1:5000/cardDealer', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                "round": 10,
                "players": this.state.players.map(val => { return val.text })
            }) // body data type must match "Content-Type" header
        })
            .then((response) => {
                return response.json();
            }).then((cards) => {
                console.log(cards, typeof cards); // this will be a string
                this.setState((state) => ({
                    cards: cards
                }));
                console.log(this.state.cards);

            });
    }

    render() {
        return (
            <div className="game" >
                <h1>Judgement</h1>
                <AddPlayers cards={this.state.cards} players={this.state.players} addPlayer={this.addPlayer} />
                {this.state.players.length >= 5 ? <Button className="btn btn-block btn-lg btn-success mb-4 col-md-5" onClick={this.getCards} >Start game</Button> : null}
                {this.state.cards && Object.keys(this.state.cards).length ? <Player players={this.state.players} cards={this.state.cards} /> : null}

            </div>
        );
    }
}

export default Game;
