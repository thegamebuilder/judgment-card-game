import React from "react";
import { AddPlayers } from "./AddPlayers";
import { Button } from "reactstrap";
import { Hand } from "./Hand";
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
            currentHand: [],

        };
        this.addPlayer = this.addPlayer.bind(this);
        this.getCards = this.getCards.bind(this);
        this.addHand = this.addHand.bind(this);
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

    addHand = (handData) => {
        if (handData.length === 0) {
            return;
        }
        const hand = {
            playerId: handData.playerId,
            card: handData.card,
        };

        // this.setState((state) => ({ currentHand: state.currentHand.concat(hand) }), () => {
        //     if (this.state.currentHand.length === 5) {
        //         this.getHandWinner();
        //     }
        // }
        // );
        this.setState((state) => ({
            currentHand: state.currentHand.concat(hand),
        }));

        this.removeCard(handData.playerId, handData.card);

        if (this.state.currentHand.length === 5) {
            this.getHandWinner();
        }
    }

    removeCard(playerId, card) {
        this.state.cards[playerId] = this.state.cards[playerId].filter(cardsData => {
            return card != cardsData;
        });
        console.log(this.state.cards[playerId]);
    }

    getCards() {
        fetch('http://127.0.0.1:5000/cardDealer', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                "round": this.state.trumps.length ? this.state.trumps.length : 1,
                "players": this.state.players.map(val => { return val.id })
            }) // body data type must match "Content-Type" header
        })
            .then((response) => {
                return response.json();
            }).then((cards) => {
                this.setState(() => ({
                    cards: cards
                }));
                console.log(this.state.cards);
            });
    }

    getHandWinner() {
        const payLoad = {
            "trump": this.state.currentTrump,
            "hands": this.state.currentHand
        }
        this.fetchApi('handWinner', payLoad)

            .then(winner => {
                console.log("hand winner is: ", winner);
            });
    }

    fetchApi(route, body) {
        const url = 'http://127.0.0.1:5000/' + route;
        return fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then((response) => {
                return response.json();
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div className="game" >
                <div className="row text-center">
                    <div className="col col-md-6  my-auto">
                        <AddPlayers cards={this.state.cards} players={this.state.players} addPlayer={this.addPlayer} />
                    </div>
                    <div className="col col-md-6">
                        <PlayingCard card={this.state.currentTrump} />
                    </div>
                </div>
                {this.state.players.length >= 5 ? <Button className="btn btn-block btn-lg btn-success mb-4 col-md-5" onClick={this.getCards} >Start game</Button> : null}
                {this.state.cards && Object.keys(this.state.cards).length ?
                    <div className="row" >
                        {this.state.players.map(player => (
                            <div className="m-4">
                                {<Hand player={player} cards={this.state.cards} addHand={this.addHand} />}
                            </div>

                        ))
                        }
                    </div>

                    : null}

            </div>
        );
    }
}

export default Game;