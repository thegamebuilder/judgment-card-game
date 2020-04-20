import React, { Component } from 'react'
import { PlayingCard } from './PlayingCard'

export class Hand extends Component {
    constructor(props) {
        super(props)
        this.addHand = this.props.addHand;
    }

    render() {
        return (

            // <div className="row" key={this.props.player.id} addHand={this.addHand} >

            // </div >
            <span>
                <div className="row">
                    <div className="col-md-6"><h5>Player name : {this.props.player.text}</h5></div>
                    <div className="col-md-6"><h5>Wins : </h5></div>
                </div>
                <div className="row">
                    {
                        this.props.cards[this.props.player.id].map(card => (
                            <PlayingCard cards={this.props.cards} player={this.props.player} card={card} currentHand={this.props.currentHand} addHand={this.addHand} />
                        ))
                    }
                </div >
            </span>
        )
    }
}
