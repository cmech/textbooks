import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Loading from '../components/Loading'
import './PinnedCourses.css'

class PinnedCourses extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      courses: []
    }
  }

  componentDidMount() {
    fetch('/api/users/5b00769b734d1d0aaaaca1cc/pinned')
      .then(res => res.json())
      .then(courses => this.setState({ courses, loading: false }))
  }

  render() {
    return (
      <div className="card mb-4">
        <div className="card-header">Pinned Courses</div>
        <ul className="list-group list-group-flush">
          {this.state.loading && <Loading />}
          {this.state.courses.map(course => {
            return (
              <li className="list-group-item" key={course.code}>
                <Link
                  to={'/course/' + course.code.replace(' ', '_')}
                  className="float-left"
                >
                  {course.code}
                </Link>
                <button className="btn-remove float-right numBooks">
                  <span className="badge badge-gold text-white numBooksNumber">
                    {course.books}
                  </span>
                  <span className="badge badge-danger numBooksRemove">
                    &times;
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default PinnedCourses
