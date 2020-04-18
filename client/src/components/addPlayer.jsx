import React from 'react'
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';

export class AddPlayer extends React.Component {

    constructor(props) {
        super(props);
        this.state = { text: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addPlayer = this.props.addPlayer;
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.addPlayer(this.state.text);
        this.setState({ text: '' });
    }

    render() {
        return (
            <div className="col-md-5" >
                {this.props.players.length < 5 ?
                    <form onSubmit={this.handleSubmit}>
                        <Input placeholder="Enter player Name" className="mb-4" onChange={this.handleChange}
                            value={this.state.text} />
                        <Button className="btn btn-block btn-lg btn-warning mb-4">Add player</Button>
                    </form>
                    : null}
                <PlayerList items={this.props.players} />
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