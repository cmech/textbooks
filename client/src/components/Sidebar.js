import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'
import Loading from './Loading'
import './Sidebar.css'
import PinnedCourses from './PinnedCourses'

class Sidebar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: null
    }

    this.authenticate = this.authenticate.bind(this)
  }

  authenticate() {
    fetch('/authenticate', { credentials: 'include' }).then(res => {
      if (res.status === 200) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    })
  }

  componentDidMount() {
    this.authenticate()
  }

  render() {
    if (this.state.loggedIn === null) {
      return (
        <div className="col-md-3">
          <Loading />
        </div>
      )
    } else if (this.state.loggedIn === false) {
      return (
        <div className="col-md-3">
          <LoginForm authenticate={this.authenticate} />
        </div>
      )
    } else if (this.state.loggedIn === true) {
      return (
        <div className="col-lg-3">
          <Link to="/post">
            <button className="btn w-100 mb-4">Post book</button>
          </Link>
          <PinnedCourses />
        </div>
      )
    }
  }
}

export default Sidebar
