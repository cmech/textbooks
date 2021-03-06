import React from 'react'

import './CoursePin.css'
import { UserContext } from '../UserContext'

function CoursePin(props) {
  let isActive = props.user.pinnedCourses.find(course => {
    return course._id === props.course._id
  })
  return (
    <button
      className="btn-remove text-white CoursePin o-75"
      style={isActive ? { opacity: 1 } : null}
      onClick={() => props.handlePin(props.course)}
    >
      <i className="fas fa-thumbtack h2" />
    </button>
  )
}

export default props => (
  <UserContext.Consumer>
    {({ user, handlePin }) => (
      <CoursePin {...props} user={user} handlePin={handlePin} />
    )}
  </UserContext.Consumer>
)
