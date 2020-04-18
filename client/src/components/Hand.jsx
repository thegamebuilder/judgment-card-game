import React, { Component } from 'react'
import { PlayingCard } from './PlayingCard'

export class Hand extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="row" key={this.props.player} >
                {this.props.cards[this.props.player].map(card => (
                    <PlayingCard card={card} />
                ))
                }
            </div>
        )
    }
}
