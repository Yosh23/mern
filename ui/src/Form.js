import React, {Component} from 'react'

import TextField from '@material-ui/core/TextField';


export default class extends Component {
    state = {
        text: '',
    }

    handleChange = e => {
        const newText = e.target.value

        this.setState({
            text: newText
        })
    }

    handleKeyDown = e => {
        if(e.key === 'Enter') {
            this.props.submit(this.state.text)
            this.setState({text: ""})
           window.location.reload(true)
        }
    }
    render() {
        const {text} = this.state
        return (
            <TextField
                label="todo..."
                margin="normal"
                value={text}
                fullWidth
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
            />
        )
    }
}