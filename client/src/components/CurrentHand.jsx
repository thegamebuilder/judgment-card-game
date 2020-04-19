import React, { Component } from 'react'

export class CurrentHand extends Component {
    render() {
        return (
            <div className="col-md-1" >
                {" "}
                {
                    <img className="cardimg hvr-bob hvr-outline-out" src={process.env.PUBLIC_URL + "/images/asset_" + this.props.card + ".png"} alt="card" />
                }
            </div>
        )
    }
}
