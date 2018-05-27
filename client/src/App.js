import React, { Component } from 'react'
import {
  BrowserRouter,
  Route,
  Link,
} from 'react-router-dom'

import './App.css'

// Components
import CourseSelector from './components/CourseSelector'

// Routes
import Home from './routes/Home'
import Course from './routes/Course'
import Book from './routes/Book'
import Post from './routes/Post'
import Sidebar from './components/Sidebar';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      redirect: {
        should: false,
        to: ""
      }
    }

  }

  goToCourse(e, course) {
    e.preventDefault()
    this.history.push('/course/' + course.id)
  }

  render() {

    return (

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
                  <nav className="navbar justify-content-end">
                    <CourseSelector action="Find" submitFunc={this.goToCourse} />
                  </nav> 
                 </div>
                </div>
              </div>
          </header>
          <div className="container">
          <div className="row">
            <div id="mainContent" className="col-lg-9 mb-4">
              <Route exact path='/' component={Home} />
              <Route path='/course/:courseId' component={Course} />
              <Route path='/book/:bookId' component={Book} />
              <Route path='/post' component={Post} />
            </div>

            {/* MOVE THIS TO A COMPONENT */}

            <Sidebar />
            
          </div>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App