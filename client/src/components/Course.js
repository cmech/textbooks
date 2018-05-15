import React, { Component } from 'react'

class Course extends Component {
  constructor(props) {
    super(props)

    this.state = {
      courses: []
    }
  }

  fetchBooks() {
    fetch("/api/courses/"+this.props.match.params.courseId)
      .then(res => res.json())
      .then(courses => this.setState({courses}))
  }

  componentDidMount() {
    this.fetchBooks()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.match.params.courseId!==this.props.match.params.courseId) {
      this.fetchBooks()
    }
  }

  render() {
    return (
      <section>
        <h2>Course {this.props.match.params.courseId}!</h2>

        <ul>
          {this.state.courses.map(course => {
            return <li key={course.id}>{course.title}: ${course.price}</li>
          })}
        </ul> 
      </section>
    )
  }
}

export default Course