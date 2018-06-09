import React, { Component } from 'react'

import CourseSelector from '../components/CourseSelector'
import PageTitle from '../components/PageTitle'
import GetFacebookUsername from '../components/GetFacebookUsername'
import ImageUpload from '../components/ImageUpload'

class Post extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      price: '',
      courses: []
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handlePriceChange = this.handlePriceChange.bind(this)
    this.selectCourse = this.selectCourse.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handlePriceChange(e) {
    if (!e.target.value.match(/[^0-9]/)) {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  selectCourse(e, course) {
    e.preventDefault()

    if (
      this.state.courses.find(
        currentCourse => currentCourse.id === course.id
      ) === undefined &&
      this.state.courses.length + 1 <= 4
    ) {
      this.setState(prevState => {
        return {
          courses: prevState.courses.concat([course])
        }
      })
    }
  }

  handleRemoveCourse(e, id) {
    e.preventDefault()
    this.setState(currentState => {
      return {
        courses: currentState.courses.filter(course => course.id !== id)
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    let data = {
      title: this.state.title,
      price: this.state.price,
      courses: this.state.courses.map(course => course.id)
    }
    fetch('/api/books/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(result =>
        this.props.history.push('/book/' + result.createdBook._id)
      )
      .catch(err => console.error(err))
  }

  render() {
    return (
      <section className="container">
        <PageTitle title="Post Book" />

        <form>
          {/* <div className="form-group">
            <ImageUpload />
          </div> */}
          <div className="form-group">
            <div className="row">
              <div className="col-md-9">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    name="title"
                    id="titleInput"
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">$</span>
                    </div>
                    <input
                      type="number"
                      name="price"
                      id="priceInput"
                      value={this.state.price}
                      onChange={this.handlePriceChange}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card form-group">
            <div className="card-header">Relevant courses</div>
            <div className="card-body">
              <CourseSelector action="Select" submitFunc={this.selectCourse} />
            </div>
            <ul className="list-group list-group-flush">
              {this.state.courses.map(course => {
                return (
                  <li key={course.id} className="list-group-item">
                    <span className="float-left">{course.code}</span>
                    <button
                      onClick={e => this.handleRemoveCourse(e, course.id)}
                      className="close float-right"
                    >
                      &times;
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="card form-group">
            <div className="card-header">Contact options</div>
            <div className="card-body">
              <GetFacebookUsername />
            </div>
          </div>
          <button type="submit" className="btn" onClick={this.handleSubmit}>
            Post
          </button>
        </form>
      </section>
    )
  }
}

export default Post
