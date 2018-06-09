import React, { Component } from 'react'

import './CoursePin.css'

class CoursePin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false
    }

    this.handlePin = this.handlePin.bind(this)
  }

  handlePin() {
    if (!this.state.active) {
      fetch('/api/users/5b00769b734d1d0aaaaca1cc/pinned', {
        method: 'POST',
        body: JSON.stringify({ courseId: this.props.course._id }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
    this.setState(prevState => {
      return { active: !prevState.active }
    })
  }

  render() {
    return (
      <button
        className="btn-remove text-white CoursePin o-75"
        style={this.state.active ? { opacity: 1 } : null}
        onClick={this.handlePin}
      >
        <i className="fas fa-thumbtack h2" />
      </button>
    )
  }
}

export default CoursePin
