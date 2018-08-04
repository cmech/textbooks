import React, { Component } from 'react'

import CourseSelector from '../components/CourseSelector'
import PageTitle from '../components/PageTitle'
import GetFacebookUsername from '../components/GetFacebookUsername'
import ImageUpload from '../components/ImageUpload'
import Loading from '../components/Loading'
import { handleGenericInputChange } from '../functions'

class Post extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      price: '',
      bookImage: {},
      courses: [],
      submitting: false
    }

    this.handleGenericInputChange = handleGenericInputChange.bind(this)
    this.handlePriceChange = this.handlePriceChange.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.selectCourse = this.selectCourse.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handlePriceChange(e) {
    if (!e.target.value.match(/[^0-9]/)) {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  handleFileChange(e) {
    this.setState({
      bookImage: e.target.files[0]
    })
  }

  selectCourse(e, course) {
    e.preventDefault()

    if (
      this.state.courses.find(
        currentCourse => currentCourse._id === course._id
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
    this.setState({ submitting: true })
    let formData = new FormData()
    formData.append('title', this.state.title)
    formData.append('price', this.state.price)
    formData.append('bookImage', this.state.bookImage)
    formData.append(
      'courses',
      JSON.stringify(this.state.courses.map(course => course.id))
    )
    fetch('/api/books', {
      method: 'POST',
      body: formData
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

        <form onSubmit={this.handleSubmit}>
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
                    onChange={this.handleGenericInputChange}
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
            <ImageUpload handleFileChange={this.handleFileChange} />
          </div>
          <div className="card form-group">
            <div className="card-header">Relevant courses</div>
            <div className="card-body">
              <CourseSelector action="Select" submitFunc={this.selectCourse} />
            </div>
            <ul className="list-group list-group-flush">
              {this.state.courses.map(course => {
                return (
                  <li key={course._id} className="list-group-item">
                    <span className="float-left">{course.code}</span>
                    <button
                      onClick={e => this.handleRemoveCourse(e, course._id)}
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
              <div className="container">
                <div className="row">
                  <div className="col-sm-4">
                    <button className="btn btn-block btn-primary">
                      Facebook
                    </button>
                  </div>
                  <div className="col-sm-4">
                    <button className="btn btn-block btn-secondary">
                      Email
                    </button>
                  </div>
                  <div className="col-sm-4">
                    <button className="btn btn-block btn-gold">
                      Instagram
                    </button>
                  </div>
                </div>
              </div>
              {/* <GetFacebookUsername /> */}
            </div>
          </div>
          {this.state.submitting ? (
            <Loading />
          ) : (
            <button type="submit" className="btn">
              Post
            </button>
          )}
        </form>
      </section>
    )
  }
}

export default Post
