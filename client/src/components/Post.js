import React, { Component } from 'react'

import CourseSelector from './CourseSelector'

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
    this.setState(prevState => {
      return {
        courses: prevState.courses.concat([course])
      }
    })
    console.log(course)
  }

  render() {
    return (
      <section>
        <h2>Post</h2>

        <form>
          <label htmlFor="title">Title:</label>
          <input 
            type="text" 
            name="title" 
            id="titleInput" 
            value={this.state.title} 
            onChange={this.handleInputChange} 
          />
          <label htmlFor="price">Price:</label>
          <input 
            type="number" 
            name="price" 
            id="priceInput"
            value={this.state.price}  
            onChange={this.handlePriceChange}
            maxLength="4"
          />
          
          <CourseSelector action="Select" submitFunc={this.selectCourse} />
          <ul>
            {this.state.courses.map(course => {
              return (
                <li key={course.id}><span>{course.name}</span> <button>Remove</button></li>
              )
            })}
          </ul>
        </form>
      </section>
    )
  }
}

export default Post