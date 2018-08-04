import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './PinnedCourses.css'
import { UserContext } from '../UserContext'

class PinnedCourses extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }
  }

  render() {
    return (
      <UserContext.Consumer>
        {({ user, handlePin }) => (
          <div className="card mb-4">
            <div className="card-header">
              <span className="float-left">Pinned Courses</span>
              <i className="fas fa-thumbtack float-right text-dark mt-1 mr-1" />
            </div>
            <ul className="list-group list-group-flush">
              {user.pinnedCourses.length !== 0 ? (
                user.pinnedCourses.map(course => {
                  return (
                    <li className="list-group-item" key={course.code}>
                      <Link
                        to={'/course/' + course.code.replace(' ', '_')}
                        className="float-left"
                      >
                        {course.code}
                      </Link>
                      {course.books !== undefined && (
                        <button className="btn-remove float-right numBooks p-0">
                          <span className="badge badge-gold text-white numBooksNumber">
                            {course.books}
                          </span>
                          <span
                            className="badge badge-danger numBooksRemove"
                            onClick={() => handlePin(course)}
                          >
                            &times;
                          </span>
                        </button>
                      )}
                    </li>
                  )
                })
              ) : (
                <li className="list-group-item">No pinned courses</li>
              )}
            </ul>
          </div>
        )}
      </UserContext.Consumer>
    )
  }
}

export default PinnedCourses
