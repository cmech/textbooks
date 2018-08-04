import React, { Component, Fragment } from 'react'
import { handleGenericInputChange } from '../functions'
import { UserContext } from '../UserContext'
import { ErrorMessage } from './ErrorMessage'

class LoginForm extends Component {
  constructor() {
    super()

    this.handleGenericInputChange = handleGenericInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  state = {
    error: {
      display: false,
      message: '',
      color: ''
    },
    signup: false
  }

  async handleSubmit(e) {
    this.setState({
      error: {
        display: false
      }
    })
    if (e.target.closest('form').checkValidity()) {
      e.preventDefault()
      let login = await this.props.handleLogin(this.state)
      if (login === 404) {
        this.setState({
          signup: true
        })
      } else if (login === 403) {
        this.setState({
          error: {
            display: true,
            message: 'Incorrent password',
            color: 'danger'
          }
        })
      }
    }
  }

  render() {
    return (
      <div className="card">
        <div className="card-header">Login / Signup</div>
        <div className="card-body">
          {this.state.error.display === true ? (
            <ErrorMessage error={this.state.error} />
          ) : null}
          {!this.state.signup ? (
            <form>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  id="login-email"
                  placeholder="Email"
                  required
                  className="form-control mb-2"
                  onChange={this.handleGenericInputChange}
                />
                <input
                  type="password"
                  name="password"
                  id="login-password"
                  placeholder="Password"
                  required
                  minLength="6"
                  className="form-control mb-2"
                  onChange={this.handleGenericInputChange}
                />
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  onClick={this.handleSubmit}
                >
                  Go
                </button>
              </div>
            </form>
          ) : (
            <Fragment>
              <div class="alert alert-gold" role="alert">
                There is no account for {this.state.email}
              </div>
              <form>
                <input
                  type="text"
                  name="name"
                  id="login-name"
                  placeholder="Full name"
                  required
                  onChange={this.handleGenericInputChange}
                  className="form-control mb-2"
                />
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  onClick={this.handleSubmit}
                >
                  Create account
                </button>
              </form>
            </Fragment>
          )}
          {/* <a href="/auth/facebook" id="fbLoginButton" target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216 216" className="_5h0m" color="#FFFFFF"><path fill="#FFFFFF" d=" M204.1 0H11.9C5.3 0 0 5.3 0 11.9v192.2c0 6.6 5.3 11.9 11.9 11.9h103.5v-83.6H87.2V99.8h28.1v-24c0-27.9 17-43.1 41.9-43.1 11.9 0 22.2.9 25.2 1.3v29.2h-17.3c-13.5 0-16.2 6.4-16.2 15.9v20.8h32.3l-4.2 32.6h-28V216h55c6.6 0 11.9-5.3 11.9-11.9V11.9C216 5.3 210.7 0 204.1 0z"></path></svg>
                        <span>Log in With Facebook</span>
                    </a> */}
        </div>
      </div>
    )
  }
}

export default props => (
  <UserContext.Consumer>
    {({ handleLogin }) => <LoginForm {...props} handleLogin={handleLogin} />}
  </UserContext.Consumer>
)
