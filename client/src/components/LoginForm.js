import React, { Component } from 'react'

class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: ""
        }

        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        fetch('/api/login', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            }),
            method: 'post',
        })
    }

    handleEmailChange(e) {
        this.setState({email:e.target.value})
    }

    handlePasswordChange(e) {
        this.setState({password:e.target.value})
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                Login
                </div>
                <form className="p-3" onSubmit={this.handleSubmit}>
                    <input type="email" name="email" className="form-control mb-2" placeholder="Email" onChange={this.handleEmailChange} /> 
                    <input type="password" name="password" className="form-control mb-2" placeholder="Password" onChange={this.handlePasswordChange} />
                    <button type="submit" className="btn w-100">Login / Signup</button>
                </form>
                <a href="/auth/facebook">Login with Facebook</a>
            </div>
        )
    }
}

export default LoginForm