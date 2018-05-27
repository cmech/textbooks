import React, { Component } from 'react'

function handleFetchError(err) {
    console.error(err)
    if(err !== undefined) {
        this.setState({
            loading: false,
            error: {
                display: true,
                message: "Error " + err.message + " occured while loading the page.",
                color: "danger"
            }
        })
    }
}

class ErrorMessage extends Component {
    render() {
        return (
            <div className={"w-100 alert alert-"+this.props.error.color} role="alert">
                {this.props.error.message}
            </div>
        )
    }
}

export { ErrorMessage, handleFetchError }