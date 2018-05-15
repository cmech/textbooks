import React, { Component } from 'react'

class Course extends Component {
  render() {
    return (
      <h2>Course {this.props.match.params.courseId}!</h2>
    )
  }
}

export default Course