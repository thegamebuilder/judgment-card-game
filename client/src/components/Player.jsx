import React from "react";
import { PlayingCard } from "./PlayingCard";

export class Player extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { card };
  }

  render() {
    return (
      <div>
        {this.props.players.length &&
        this.props.cards &&
        Object.keys(this.props.cards).length ? (
          <div className="row">
            {this.props.players.map((player) => (
              <div className="row" key={player.text}>
                {this.props.cards[player.text].map((card) => (
                  <PlayingCard card={card} />
                ))}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

// this.props.cards[player.text].map(card =>(
//     // <h2>{card}</h2>
//     <PlayingCard card = 'KC' />
//    ))
