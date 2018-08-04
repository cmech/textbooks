import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'

import './App.css'

// Components
import CourseSelector from './components/CourseSelector'

// Routes
import Home from './routes/Home'
import Course from './routes/Course'
import Book from './routes/Book'
import Post from './routes/Post'
import Sidebar from './components/Sidebar'
import { UserContext, user } from './UserContext'
import ScrollToTop from './components/ScrollToTop'

class App extends Component {
  constructor() {
    super()

    this.state = {
      redirect: {
        should: false,
        to: ''
      },
      user: user
    }

    this.handlePin = newCourse => {
      // Check if course is already pinned
      let isCoursePinned = this.state.user.pinnedCourses.find(course => {
        return course._id === newCourse._id
      })
      if (isCoursePinned) {
        // Unpin course
        fetch(`/api/users/${this.state.user._id}/pinned/${newCourse._id}`, {
          method: 'DELETE'
        }).then(
          this.setState(prevState => {
            let user = prevState.user
            user.pinnedCourses = user.pinnedCourses.filter(
              course => course._id !== newCourse._id
            )
            return { user }
          })
        )
      } else {
        // Pin course
        fetch(`/api/users/${this.state.user._id}/pinned/${newCourse._id}`, {
          method: 'POST'
        }).then(
          this.setState(prevState => {
            let user = prevState.user
            user.pinnedCourses = user.pinnedCourses
              .concat(newCourse)
              .sort((a, b) => {
                let x = a.code,
                  y = b.code
                return x === y ? 0 : x > y ? 1 : -1
              })
            return { user }
          })
        )
      }
    }

    this.handleBookmark = newBook => {
      // Check if book is already bookmarked
      let isBookMarked = this.state.user.bookmarks.find(book => {
        return book._id === newBook._id
      })
      if (isBookMarked) {
        // Unbookmark book
        fetch(`/api/users/${this.state.user._id}/bookmarks/${newBook._id}`, {
          method: 'DELETE'
        }).then(
          this.setState(prevState => {
            let user = prevState.user
            user.bookmarks = user.bookmarks.filter(
              book => book._id !== newBook._id
            )
            return { user }
          })
        )
      } else {
        // Bookmark book
        fetch(`/api/users/${this.state.user._id}/bookmarks/${newBook._id}`, {
          method: 'POST'
        }).then(
          this.setState(prevState => {
            let user = prevState.user
            user.bookmarks = user.bookmarks.concat(newBook)
            return { user }
          })
        )
      }
    }

    this.handleLogin = userData => {
      console.log({ userData })

      return fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
        .then(res => {
          if (!res.ok) {
            throw res.status
          }
          return res
        })
        .then(res => res.json())
        .then(user => {
          this.setState({
            user
          })
        })
        .catch(err => {
          return err
        })
    }

    this.handleLogout = () => {
      this.setState({
        user: {
          _id: '',
          name: '',
          pinnedCourses: [],
          bookmarks: []
        }
      })
    }
  }

  goToCourse(e, course) {
    e.preventDefault()
    console.log(course.code.replace(' ', '_'))
    this.history.push('/course/' + course.code.replace(' ', '_'))
  }

  componentDidMount() {
    // fetch('/api/users/5b00769b734d1d0aaaaca1cc')
    //   .then(res => res.json())
    //   .then(user => this.setState({ user }))
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          handlePin: this.handlePin,
          handleBookmark: this.handleBookmark,
          handleLogin: this.handleLogin,
          handleLogout: this.handleLogout
        }}
      >
        <BrowserRouter>
          <ScrollToTop>
            <div>
              <header id="mainHeader" className="mb-md-4">
                <div className="container">
                  <div className="row">
                    <div className="col-md-3">
                      <h1 className="pl-xso-3">
                        <Link to="/">Textbooks</Link>
                      </h1>
                    </div>
                    <div className="col-md-9">
                      <nav className="navbar justify-content-end pr-0">
                        <CourseSelector
                          action="Find"
                          submitFunc={this.goToCourse}
                        />
                      </nav>
                    </div>
                  </div>
                </div>
              </header>
              <div className="container">
                <div className="row">
                  <div id="mainContent" className="col-lg-9 mb-4">
                    <Route exact path="/" component={Home} />
                    <Route path="/course/:courseCode" component={Course} />
                    <Route path="/book/:bookId" component={Book} />
                    <Route path="/post" component={Post} />
                  </div>

                  {/* MOVE THIS TO A COMPONENT */}

                  <Sidebar />
                </div>
              </div>
            </div>
          </ScrollToTop>
        </BrowserRouter>
      </UserContext.Provider>
    )
  }
}

export default App
