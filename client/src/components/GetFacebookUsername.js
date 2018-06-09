import React, { Component } from 'react'
import MessengerButton from './MessengerButton'

class GetFacebookUsername extends Component {
  constructor(props) {
    super(props)

    this.state = {
      link: '',
      userName: ''
    }

    this.handleUrlChange = this.handleUrlChange.bind(this)
  }
  handleUrlChange(e) {
    let re = /(?<!\/)\/{1}(?!\/)([a-zA-Z0-9.]{5,})/
    let userName = re.exec(e.target.value)
    console.log(userName)
    if (userName) {
      this.setState({ link: e.target.value, userName: userName[1] })
    }
  }

  render() {
    return (
      <section>
        <p>
          <a
            href="http://facebook.com/profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Facebook Link
          </a>
        </p>
        <input
          type="text"
          name="profileUrl"
          id="profileUrl"
          className="form-control"
          onChange={this.handleUrlChange}
          placeholder="Paste profile URL here"
        />
        {/* <p>{this.state.userName}</p> */}
        {this.state.userName && <MessengerButton id={this.state.userName} />}
      </section>
    )
  }
}

export default GetFacebookUsername
