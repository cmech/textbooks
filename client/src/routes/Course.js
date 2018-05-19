import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Course.css'

function BookList(props) {
  if(props.noBooks === true) {
    return <p>There are no books on sale for this course.</p>
  } else {
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
}

class Course extends Component {
  constructor(props) {
    super(props)

    this.state = {
      books: [],
      courseName: "",
      noBooks: false,
      loading: true
    }
  }

  fetchBooks() {
    fetch("/api/books/course/"+this.props.match.params.courseId)
    .then(res => res.json())
    .then(data => {
      let noBooks = false
      if(data.books.length === 0) {
        noBooks = true 
      }
      this.setState({
        books: data.books,
        courseName: data.course,
        noBooks,
        loading: false,
      })
    })
    .catch(err => console.log(err))
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
        <h2>Course: {this.state.courseName}</h2>

        <BookList noBooks={this.state.noBooks} books={this.state.books} />
      </section>
    )
  }
}

export default Course