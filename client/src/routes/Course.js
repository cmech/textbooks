import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Course.css'
import { ErrorMessage, handleFetchError } from '../components/ErrorMessage';

function BookList(props) {
  return (
    <ul className="BookList">
      {props.books.map(book => {
        return (
          <li key={book.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={'/book/'+book.id}>{book.title}</Link>
                </h5>
                <h6 className="card-subtitle text-muted mb-2">
                  ${book.price}
                </h6>
              </div>
            </div>  
          </li>
        )
      })}
    </ul> 
  )
}

class Course extends Component {
  constructor(props) {
    super(props)

    this.state = {
      books: [],
      courseName: "",
      loading: true,
      error: {
        display: true,
        message: "Error 500 - Internal server error.",
        color: "warning"
      },
    }


    this.handleFetchError = handleFetchError.bind(this)
  }

  fetchBooks() {
    fetch("/api/books/course/"+this.props.match.params.courseId)
    .then(res => { 
      if(res.status !== 200) {
          throw Error(res.status)
      } else {
          return res 
      }
    })
    .then(res => res.json())
    .then(data => {
      let error = {}
      if(data.books.length === 0) {
        error = {
          display: true,
          message: "No books are on sale for this course.",
          color: "secondary"
        }
      }
      this.setState({
        books: data.books,
        courseName: data.course,
        error,
        loading: false,
      })
    })
    .catch(err => this.handleFetchError(err))
  }

  componentDidMount() {
    this.fetchBooks()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.match.params.courseId!==this.props.match.params.courseId) {
      this.setState({ loading: false })
      this.fetchBooks()
    }
  }

  render() {
    if(this.state.loading)  {
      return <h2>Loading</h2>
    }
    return (
      <section className="container">
        <h2 className="pageTitle">Course: {this.state.courseName}</h2>

        {this.state.error.display === true &&
          <ErrorMessage error={this.state.error} />
        }

        <BookList books={this.state.books} />
      </section>
    )
  }
}

export default Course