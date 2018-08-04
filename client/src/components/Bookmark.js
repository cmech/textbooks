import React from 'react'

import './CoursePin.css'
import { UserContext } from '../UserContext'

function Bookmark(props) {
  let isActive = props.user.bookmarks.find(book => {
    return book._id === props.book._id
  })
  return (
    <button
      className="btn-remove text-white CoursePin o-75"
      style={isActive ? { opacity: 1 } : null}
      onClick={() => props.handleBookmark(props.book)}
    >
      <i className="fas fa-bookmark h2" />
    </button>
  )
}

export default props => (
  <UserContext.Consumer>
    {({ user, handleBookmark }) => (
      <Bookmark {...props} user={user} handleBookmark={handleBookmark} />
    )}
  </UserContext.Consumer>
)
