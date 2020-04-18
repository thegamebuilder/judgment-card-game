import React from "react";

export class PlayingCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="col-md-1">
        {" "}
        {
          <img className="cardimg hvr-bob hvr-outline-out" src={process.env.PUBLIC_URL + "/images/" + this.props.card + ".png"} alt="card" />
        }
      </div>
    );
  }
}
