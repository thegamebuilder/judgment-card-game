import React from "react";
import { AddPlayers } from "./AddPlayers";
import { Button } from "reactstrap";
import { Hand } from "./Hand";
import { PlayingCard } from "./PlayingCard";
import { CurrentHand } from "./CurrentHand";

var tableStyle = {
    width: "100%",
    height: "300px",
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${process.env.PUBLIC_URL + "/images/asset_table.png"})`,
    backgroundPosition: 'center'
};

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
            currentHandBase: "",
            gameStarted: false
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
        let canDeal = false;
        let playerBase = handData.card.substr(handData.card.length - 1, 1);
        if (handData.length === 0) {
            return;
        }

        if (!this.state.currentHand.length) {
            this.setState((state) => ({
                currentHandBase: playerBase
            }));
            canDeal = true
        } else {
            if (!this.isCurrentHandDone(handData.playerId) && (playerBase === this.state.currentHandBase || this.isNoBaseCard(handData.playerId, this.state.currentHandBase))) {
                canDeal = true;
            }
        }

        if (canDeal) {
            const hand = {
                playerId: handData.playerId,
                card: handData.card,
            };
            this.setState((state) => ({
                currentHand: state.currentHand.concat(hand),
            }));
            this.removeCard(handData.playerId, handData.card);
        }
    }

    componentDidUpdate() {
        if (this.state.currentHand.length === 5) {
            this.getHandWinner();
            this.setState({
                currentHand: []
            });
        }
    }

    removeCard(playerId, card) {
        this.state.cards[playerId] = this.state.cards[playerId].filter(cardsData => {
            return card != cardsData;
        });
    }

    isNoBaseCard(playerId, currentBase) {
        for (let card of this.state.cards[playerId]) {
            let base = card.substr(card.length - 1, 1);
            if (base === currentBase) {
                return false;
            }
        }
        return true;
    }

    isRoundDone() {
        return (Object.values(this.state.cards)[0]).length === 0;
    }

    updateRound() {
        if (this.state.trumps.length) {
            this.state.trumps.shift();
            this.setState({
                trumps: this.state.trumps,
                currentTrump: this.state.trumps[0]
            });
        }
    }

    isCurrentHandDone(playerId) {
        const currentHandDone = this.state.currentHand && this.state.currentHand.find(hand => {
            return hand.playerId === playerId
        });
        return currentHandDone;
    }

    getCards() {
        if (!this.state.gameStarted) {
            this.setState(() => ({
                gameStarted: true
            }));
        }


        fetch('http://127.0.0.1:5000/cardDealer', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                "round": this.state.trumps.length ? this.state.trumps.length : 0,
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
                if (this.isRoundDone() && this.state.trumps.length) { // round is done
                    this.updateRound();
                    this.getCards();
                }
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
            <div>
                {!this.state.gameStarted ?
                    <div className="game" >
                        <div className="row text-center">
                            <div className="col col-md-6  my-auto">
                                <AddPlayers cards={this.state.cards} players={this.state.players} addPlayer={this.addPlayer} />
                            </div>
                        </div>
                        <div className="row" >
                            <div className="col" >
                                {this.state.players.length >= 5 ? <Button className="btn btn-block btn-lg btn-success mb-4 col-md-5" onClick={this.getCards} >Start game</Button> : null}
                            </div>
                        </div>
                    </div> : null
                }

                <div className="row">
                    <div className="col-md-2 m-4 text-center"></div>
                    {this.state.currentHand.length ?
                        <div className="col-xs-10 d-flex justify-content-center" style={tableStyle}>
                            {
                                this.state.currentHand.map(currHand => (
                                    < CurrentHand card={currHand.card} />
                                ))
                            }
                        </div>
                        : null}
                    <div className="col-md-2 m-4 text-center"></div></div>
                <div className="row">
                    {this.state.cards && Object.keys(this.state.cards).length ?
                        this.state.players.map(player => (
                            <div className="row"><div className="col-md-2 m-4 text-center">
                                <h5> Trump Card </h5>
                                {this.state.trumps.length ?
                                    <img className="cardimg hvr-outline-out" src={process.env.PUBLIC_URL + "/images/asset_" + this.state.currentTrump + ".png"} alt="card" />
                                    : null}
                            </div>
                                <div className="col-md-8">
                                    <div className="m-4" key={player.id}>
                                        {<Hand disabled={true} player={player} cards={this.state.cards} addHand={this.addHand} currentHand={this.state.currentHand} />}
                                    </div>
                                </div>
                                <div className="col-md-2"></div>
                            </div>
                        ))
                        : null}
                </div>
            </div>
        );
    }
}

export default Game;