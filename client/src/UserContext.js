import React from 'react'

export const user = {
  _id: '',
  name: '',
  pinnedCourses: [],
  bookmarks: []
}

export const UserContext = React.createContext({
  user,
  handlePin: () => {},
  handleBookmark: () => {},
  handleLogin: () => {},
  handleLogout: () => {}
})
