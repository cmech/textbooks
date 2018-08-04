import React, { Component } from 'react'
import './ProfileIcon.css'
import Link from 'react-router-dom/Link'

class ProfileIcon extends Component {
  render() {
    return (
      <div className="profileIcon">
        <Link to="/user/7">
          <img
            className="profilePicture"
            src={
              'https://graph.facebook.com/' +
              this.props.id +
              '/picture?type=large'
            }
            alt="User profile"
          />
        </Link>
        {this.props.label !== false && (
          <div className="profileLabel">
            <Link to="/user/7">Caleb</Link>
          </div>
        )}
      </div>
    )
  }
}

export default ProfileIcon
