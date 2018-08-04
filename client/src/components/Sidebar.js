import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'
// import Loading from './Loading'
import './Sidebar.css'
import PinnedCourses from './PinnedCourses'
import Bookmarks from './Bookmarks'
import { UserContext } from '../UserContext'

class Sidebar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: null
    }

    // this.authenticate = this.authenticate.bind(this)
  }

  authenticate() {
    this.setState({ loggedIn: true })
    // fetch('/authenticate', { credentials: 'include' }).then(res => {
    //   if (res.status === 200) {
    //     this.setState({ loggedIn: true })
    //   } else {
    //     this.setState({ loggedIn: false })
    //   }
    // })
  }

  componentDidMount() {
    // this.authenticate()
  }

  render() {
    // if (this.props.user._id === '') {
    //   return (
    //     <div className="col-md-3">
    //       <Loading />
    //     </div>
    //   )
    // } else
    if (this.props.user._id.length === 24) {
      return (
        <div className="col-lg-3">
          <Link to="/post">
            <button className="btn btn-primary w-100 mb-4">Post book</button>
          </Link>
          <PinnedCourses />
          <Bookmarks />
          <hr className="mb-4" />
          <button className="btn w-100 mb-4" onClick={this.props.handleLogout}>
            Logout
          </button>
        </div>
      )
    } else {
      return (
        <div className="col-md-3">
          <LoginForm />
        </div>
      )
    }
  }
}

export default props => (
  <UserContext.Consumer>
    {({ user, handleLogout }) => (
      <Sidebar {...props} user={user} handleLogout={handleLogout} />
    )}
  </UserContext.Consumer>
)
