import React from "react";

export class PlayingCard extends React.Component {
  constructor(props) {
    super(props);
    this.addHand = this.props.addHand;
    this.handleAddHand = this.handleAddHand.bind(this);
  }

  handleAddHand() {
    const handPayload = {
      card: this.props.card,
      playerId: this.props.player.id
    }
    this.props.addHand(handPayload);
  }

  render() {
    return (
      <div className="col-md-1">
        {" "}
        {
          <img onClick={this.handleAddHand} className="cardimg hvr-bob hvr-outline-out" src={process.env.PUBLIC_URL + "/images/" + this.props.card + ".png"} alt="card" />
        }
      </div>
    );
  }
}
