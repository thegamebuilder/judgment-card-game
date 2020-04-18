import React from 'react'
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';

export class EntryComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { players: this.props.players, text: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.text.length === 0) {
            return;
        }
        const newItem = {
            text: this.state.text,
            id: Date.now()
        };
        this.setState(state => ({
            players: state.players.concat(newItem),
            text: ''
        }));
    }

    render() {
        return (
            <div className="col-md-5" >
                <form onSubmit={this.handleSubmit}>
                    <Input placeholder="Enter player Name" className="mb-4" onChange={this.handleChange}
                        value={this.state.text} />
                    {this.state.players.length < 5 ? <Button className="btn btn-block btn-lg btn-warning mb-4">Add player</Button> : null}
                </form>
                <PlayerList items={this.state.players} />
                {this.state.players.length >= 5 ? <Button className="btn btn-block btn-lg btn-success mb-4">Start game</Button> : null}
            </div>
        )
    }
}

class PlayerList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.items.map(item => (
                    <li key={item.id}>{item.text}</li>
                ))}
            </ul>
        );
    }
}