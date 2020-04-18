import React from "react";

export class PlayingCard extends React.Component {
  render() {
    return (
      <div className="col-md-1">
        {" "}
        {
          <img src={process.env.PUBLIC_URL + "/images/" + this.props.card + ".png"} alt="card" />
        }
      </div>
    );
  }
}
