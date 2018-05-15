import React, { Component } from 'react'
import {
  BrowserRouter,
  Route,
  Link,
} from 'react-router-dom'

// Components
import CourseSelector from './CourseSelector'

// Routes
import Home from './Home'
import Course from './Course'
import Post from './Post'

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
          <CourseSelector action="Find" submitFunc={this.goToCourse} />
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/post'>Post</Link></li>
          </ul>
          
          <hr/>
          <Route exact path='/' component={Home} />
          <Route path='/course/:courseId' component={Course} />
          <Route path='/post' component={Post} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App