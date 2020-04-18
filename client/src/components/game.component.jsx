import React  from 'react'
import { EntryComponent } from './entry.component'
class GameComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { players: [] };
    }


    render() {
        return (
            <div className="game">
                <h1>Judgement</h1>
            <EntryComponent players={this.state.players}/>
            </div>
        );
    }
}

export default GameComponent;