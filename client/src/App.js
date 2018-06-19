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

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      redirect: {
        should: false,
        to: ''
      },
      user: user
    }

    this.handlePin = newCourse => {
      let coursePinned = this.state.user.pinnedCourses.find(course => {
        return course._id === newCourse._id
      })
      if (coursePinned) {
        fetch(`/api/users/${user._id}/pinned/${newCourse._id}`, {
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
        fetch(`/api/users/${user._id}/pinned/${newCourse._id}`, {
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
      // handlePin() {
      //   if (!this.state.active) {
      //     fetch('/api/users/5b00769b734d1d0aaaaca1cc/pinned', {
      //       method: 'POST',
      //       body: JSON.stringify({ courseId: this.props.course._id }),
      //       headers: {
      //         'Content-Type': 'application/json'
      //       }
      //     }).then(res => {
      //       console.log(res)
      //     })
      //   }
      // }
    }
  }

  goToCourse(e, course) {
    e.preventDefault()
    console.log(course.code.replace(' ', '_'))
    this.history.push('/course/' + course.code.replace(' ', '_'))
  }

  componentDidMount() {
    fetch('/api/users/5b00769b734d1d0aaaaca1cc')
      .then(res => res.json())
      .then(user => this.setState({ user }))
  }

  render() {
    return (
      <UserContext.Provider
        value={{ user: this.state.user, handlePin: this.handlePin }}
      >
        <BrowserRouter>
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
        </BrowserRouter>
      </UserContext.Provider>
    )
  }
}

export default App
