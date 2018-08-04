import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './PinnedCourses.css'
import { UserContext } from '../UserContext'
import { Truncate } from '../functions'

class Bookmarks extends Component {
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
              <span className="float-left">Bookmarks</span>
              <i className="fas fa-bookmark float-right text-dark mt-1 mr-1" />
            </div>
            <ul className="list-group list-group-flush">
              {user.bookmarks.length !== 0 ? (
                user.bookmarks.map(book => {
                  return (
                    <li className="list-group-item" key={book._id}>
                      <Link to={`/book/${book._id}`} className="float-left">
                        <Truncate length="30">{book.title}</Truncate>
                      </Link>
                      {/* {course.books !== undefined && (
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
                    )} */}
                    </li>
                  )
                })
              ) : (
                <li className="list-group-item">No bookmarked books</li>
              )}
            </ul>
          </div>
        )}
      </UserContext.Consumer>
    )
  }
}

export default Bookmarks
