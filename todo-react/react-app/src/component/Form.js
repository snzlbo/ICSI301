import React from 'react';
import TextField from '@material-ui/core/TextField';
import './form.css';

export default class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ""
        }
    }

    handleChange = (event) => {
        const newText = event.target.value;
        this.setState({
            text: newText
        })
    }
    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.props.submit(this.state.text);
            this.setState({ text: "" });
        }
    }


    render() {
        const { text } = this.state
        console.log(text);
        return (

            <form className="form">
                <TextField
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    fullWidth
                    label="Add a Task"
                    id="filled-basic"
                    margin="normal"
                />
            </form >

        )
    }
}