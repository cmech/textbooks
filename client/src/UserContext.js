import React from 'react'

export const user = {
  authenticated: true,
  _id: '5b00769b734d1d0aaaaca1cc',
  name: 'Caleb Mech',
  pinnedCourses: []
}

export const UserContext = React.createContext({ user, handlePin: () => {} })
