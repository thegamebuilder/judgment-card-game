import React from 'react'
import { AddPlayer } from './addPlayer'
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';

class GameComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { players: [] };
        this.addPlayer = this.addPlayer.bind(this);
    }

    addPlayer(playerName) {
        if (playerName.length === 0) {
            return;
        }
        const newItem = {
            text: playerName,
            id: Date.now()
        };
        this.setState(state => ({
            players: state.players.concat(newItem),
            text: ''
        }));
    }
    render() {
        return (
            <div className="game" >
                <h1>Judgement</h1>
                <AddPlayer players={this.state.players} addPlayer={this.addPlayer} />
                {this.state.players.length >= 5 ? <Button className="btn btn-block btn-lg btn-success mb-4 col-md-5">Start game</Button> : null}
            </div>
        );
    }
}

export default GameComponent;