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
            // redirect: 'follow', // manual, *follow, error
            // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url

            body: JSON.stringify({
                "round": 10,
                "players": this.state.players.map(val => { return val.text })
            }) // body data type must match "Content-Type" header
        })
            .then(function (response) {
                return response.text();
            }).then(function (data) {
                console.log(data); // this will be a string
            });


    }

    render() {
        return (
            <div className="game" >
                <h1>Judgement</h1>
                <AddPlayer players={this.state.players} addPlayer={this.addPlayer} />
                {this.state.players.length >= 5 ? <Button className="btn btn-block btn-lg btn-success mb-4 col-md-5" onClick={this.getCards()} >Start game</Button> : null}
            </div>
        );
    }
}

export default GameComponent;
