import React, { Component } from 'react'
import './ProfileIcon.css'

class ProfileIcon extends Component {
  render() {
    return (
      <div className="profileIcon">
        <img
          className="profilePicture"
          src={
            'https://graph.facebook.com/' +
            this.props.id +
            '/picture?type=large'
          }
          alt="User profile"
        />
        {this.props.label !== false && (
          <div className="profileLabel">
            <a href="/user/7">Caleb</a>
          </div>
        )}
      </div>
    )
  }
}

export default ProfileIcon
