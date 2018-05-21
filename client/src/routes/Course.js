import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Course.css'
import { ErrorMessage, handleFetchError } from '../components/ErrorMessage'
import Loading from '../components/Loading'

function BookList(props) {
  return (
    <div className="BookList card-deck">
      {props.books.map(book => {
        let title = book.title
        if(title.length > 30) {
          title = title.substring(0, 48-3)+"..."
        }
        return (
            <div className="card flex-md-row" id="bookListCard" key={book.id}>
              <img height="150" src="/images/book4.jpg" alt="Textbook" className="card-img-right flex-auto d-none d-lg-block" />
              <div className="card-body d-flex flex-column align-items-start">
                <h5 className="card-title">
                  <Link to={'/book/'+book.id}>{title}</Link>
                </h5>
                
                <div class="card-footer">
                  <span className="card-subtitle text-muted my-1 h3">
                  ${book.price}
                  </span>
                </div>
              </div>
              
            </div>  
        )
      })}
    </div> 
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
      this.setState({ loading: true })
      this.fetchBooks()
    }
  }

  render() {
    if(this.state.loading)  {
      return <Loading />
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