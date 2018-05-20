import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

class LoginForm extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            loggedIn: false,
            user: {
                fb_id: '',
                first_name: '',
                last_name: ''
            }
        }

        this.responseFacebook = this.responseFacebook.bind(this)
    }

    responseFacebook(res) {
        console.log(res)
        this.setState({
            loggedIn: true,
            user: {
                fb_id: res.id,
                first_name: res.first_name,
                last_name: res.last_name
            }
        })
        // fetch('/api/login', {
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         email: this.state.email,
        //         password: this.state.password
        //     }),
        //     method: 'post',
        // })
    }

    render() {
        if(this.state.loggedIn === true) {
            return <h2>Logged in</h2>
        }
        return (
            <div className="card">
                <div className="card-header">
                Login
                </div>
                <div className="card-body">
                    <FacebookLogin
                        appId="1207080746061126"
                        autoLoad={true}
                        fields="id,first_name,last_name"
                        scope="public_profile"
                        onClick={this.componentClicked}
                        callback={this.responseFacebook}
                        render={renderProps => (
                            <a onClick={renderProps.onClick} id="fbLoginButton" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216 216" className="_5h0m" color="#FFFFFF"><path fill="#FFFFFF" d=" M204.1 0H11.9C5.3 0 0 5.3 0 11.9v192.2c0 6.6 5.3 11.9 11.9 11.9h103.5v-83.6H87.2V99.8h28.1v-24c0-27.9 17-43.1 41.9-43.1 11.9 0 22.2.9 25.2 1.3v29.2h-17.3c-13.5 0-16.2 6.4-16.2 15.9v20.8h32.3l-4.2 32.6h-28V216h55c6.6 0 11.9-5.3 11.9-11.9V11.9C216 5.3 210.7 0 204.1 0z"></path></svg>
                                <span>Log in With Facebook</span>
                            </a>
                        )}
                         />
                </div>
            </div>
        )
    }
}

export default LoginForm