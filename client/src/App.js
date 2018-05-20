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
          <header id="mainHeader">
          <Link to="/">
            <div className="py-4 text-center text-white bg-primary">
              <h1>Textbooks</h1>
            </div>
            </Link>
            <nav className="navbar bg-light justify-content-center mb-4 box-shadow border-bottom">
              <CourseSelector action="Find" submitFunc={this.goToCourse} />
            </nav>
          </header>

          <div className="container">
          <div className="row">
            <div className="col-md-9">
              <Route exact path='/' component={Home} />
              <Route path='/course/:courseId' component={Course} />
              <Route path='/book/:bookId' component={Book} />
              <Route path='/post' component={Post} />
            </div>

            {/* MOVE THIS TO A COMPONENT */}

            <div className="col-md-3">
              
            <Link to='/post'><button className="btn w-100 mb-4">Post book</button></Link>

              <div className="card mb-4">
                <div className="card-header">
                  Pinned Courses
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-md-9"><Link to='/course/2136'>MATH 1ZA3</Link></div>
                      <div className="col-md-3 text-right"><span className="badge badge-secondary">5</span></div>
                    </div>   
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-md-9"><Link to='/course/1039'>PHYSICS 1D04</Link></div>
                      <div className="col-md-3 text-right"><span className="badge badge-secondary">0</span></div>
                    </div>   
                  </li>                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-md-9"><Link to='/course/2280'>ENG 1D04</Link></div>
                      <div className="col-md-3 text-right"><span className="badge badge-secondary">12</span></div>
                    </div>   
                  </li>                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-md-9"><Link to='/course/1391'>CHEM 1E03</Link></div>
                      <div className="col-md-3 text-right"><span className="badge badge-secondary">3</span></div>
                    </div>   
                  </li>
                  {/* <li className="list-group-item"><Link to='/course/1039'>PHYSICS 1D03</Link> <span class="badge badge-secondary">0</span></li>
                  <li className="list-group-item"><Link to='/course/2280'>ENG 1D04</Link> <span class="badge badge-secondary">12</span></li>
                  <li className="list-group-item"><Link to='/course/1391'>CHEM 1E03</Link> <span class="badge badge-secondary">3</span></li> */}
                </ul>
              </div>

              <div className="card">
                <div className="card-header">
                  Login
                </div>
                <form className="p-3">
                  <input type="email" className="form-control mb-2" placeholder="Email" /> 
                  <input type="password" className="form-control mb-2" placeholder="Password" />
                  <button type="submit" className="btn w-100">Login / Signup</button>
                </form>
              </div>

            </div>
          </div>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App