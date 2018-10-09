import React, { Component } from 'react'
import { UserContext } from '../UserContext'
import './Login.css'

class Login extends Component {
  constructor() {
    super()

    this.state = {
      response: {}
    }

    this.responseFacebook = this.responseFacebook.bind(this)
  }
  responseFacebook(response) {
    console.log(response)
    console.log(this.props)
    this.props.handleLogin(response)
  }

  // componentDidMount() {
  //   window.FB.getLoginStatus(function(response) {
  //     console.log(response)
  //     window.statusChangeCallback(response)
  //   })
  // }

  render() {
    return (
      <div className="text-center">
        {/* <div
          className="fb-login-button"
          data-max-rows="1"
          data-size="medium"
          data-button-type="continue_with"
          data-show-faces="false"
          data-auto-logout-link="true"
          data-use-continue-as="true"
          scope="user_link"
        /> */}
        {/* <FacebookLogin
          appId="1207080746061126"
          autoLoad={true}
          fields="name,picture"
          scope="public_profile, user_link"
          callback={this.responseFacebook}
          cssClass="fbLoginButton"
        /> */}
        <a href="api/users/auth/facebook" className="fbLoginButton">
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 72 72"
            fill="#fff"
          >
            <defs />
            <title>flogo-HexRBG-Wht-72</title>
            <path
              className="cls-1"
              d="M68,0H4A4,4,0,0,0,0,4V68a4,4,0,0,0,4,4H38.46V44.16H29.11V33.26h9.35v-8c0-9.3,5.68-14.36,14-14.36a77.46,77.46,0,0,1,8.38.43V21H55.08c-4.5,0-5.37,2.14-5.37,5.29v6.94H60.5l-1.4,10.9H49.71V72H68a4,4,0,0,0,4-4V4A4,4,0,0,0,68,0Z"
            />
          </svg>
          Login with Facebook
        </a>
      </div>
    )
  }
}

export default props => (
  <UserContext.Consumer>
    {({ handleLogin }) => <Login {...props} handleLogin={handleLogin} />}
  </UserContext.Consumer>
)
