import React from "react";

export class PlayingCard extends React.Component {
  render() {
    return (
      <div className="col-md-1">
        {" "}
        {
          <img
            className="portrait rounded"
            src={process.env.PUBLIC_URL + "/images/" + this.props.card + ".png"}
          />
        }
      </div>
    );
  }
}
