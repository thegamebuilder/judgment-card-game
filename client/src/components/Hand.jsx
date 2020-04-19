import React, { Component } from 'react'
import { PlayingCard } from './PlayingCard'

export class Hand extends Component {
    constructor(props) {
        super(props)
        this.addHand = this.props.addHand;
    }

    render() {
        return (

            < div className="row" key={this.props.player.id} addHand={this.addHand} >
                {
                    this.props.cards[this.props.player.id].map(card => (
                        <PlayingCard cards={this.props.cards} player={this.props.player} card={card} currentHand={this.props.currentHand} addHand={this.addHand} />
                    ))
                }
            </div >
        )
    }
}
