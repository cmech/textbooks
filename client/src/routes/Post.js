import React, { Component } from 'react'

import CourseSelector from '../components/CourseSelector'

class Post extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      price: '',
      courses: [],
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handlePriceChange = this.handlePriceChange.bind(this)
    this.selectCourse = this.selectCourse.bind(this)
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value 
    })
  }

  handlePriceChange(e) {
    if(e.target.value <= 9999) {
      this.setState({
        [e.target.name]: e.target.value 
      })
    }
  }

  selectCourse(e, course) {
    e.preventDefault()

    if(this.state.courses.find(currentCourse => currentCourse.id === course.id) === undefined && this.state.courses.length+1 <= 4) {
      this.setState(prevState => {
        return {
          courses: prevState.courses.concat([course])
        }
      })
    }
  }

  handleRemoveCourse(e, id) {
    e.preventDefault()
    this.setState((currentState) => {
        return {
          courses: currentState.courses.filter(course => course.id !== id )
      } 
    })
  }

  render() {
    return (
      <section className="container">
        <h2>Post</h2>

        <form>
          <label htmlFor="title">Title:</label>
          <input 
            type="text" 
            name="title" 
            id="titleInput" 
            value={this.state.title} 
            onChange={this.handleInputChange} 
            className="form-control"
          />
          <label htmlFor="price">Price:</label>
          <input 
            type="number" 
            name="price" 
            id="priceInput"
            value={this.state.price}  
            onChange={this.handlePriceChange}
            maxLength="4"
            className="form-control"
          />
          
          <label>Courses:</label>
          <CourseSelector action="Select" submitFunc={this.selectCourse} />
          <ul>
            {this.state.courses.map(course => {
              return (
                <li key={course.id}>
                  <span>{course.name}</span> <button onClick={(e) => this.handleRemoveCourse(e, course.id)}>Remove</button>
                </li>
              )
            })}
          </ul>

          <button type="submit" className="btn">Post</button>
        </form>
      </section>
    )
  }
}

export default Post