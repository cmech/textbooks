import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Course.css'
import { ErrorMessage, handleFetchError } from '../components/ErrorMessage'
import Loading from '../components/Loading'
import ProfileIcon from '../components/ProfileIcon';
import TimeAgo from 'timeago-react'

function BookList(props) {
  return (
    <div className="BookList w-100">
      {props.books.map(book => {
        let title = book.title
        if(title.length > 40) {
          title = title.substring(0, 58-3)+"..."
        }
        return (
            <div className="card flex-row mb-3 bookListCard" key={book.id}>
              <img height="155" src="/images/book4.jpg" alt="Textbook" className="card-img-right flex-auto d-none d-block" />
              <div className="card-body d-flex flex-column align-items-start">
                <h5 className="card-title mb-1">
                <Link className="text-dark" to={'/book/'+book.id}>{book.title}</Link>
                </h5>
                <p className="text-secondary mb-1">Posted <TimeAgo className="text-secondary" datetime={book.datePosted} locale='en' live={false} /></p>
                <div className="card-text">
                <span className="mt-2 h3">
                ${book.price}
                </span>
                </div>
                
                {/* <div className="card-footer">
                </div> */}
              </div>
              <div className="profileIcon mr-4 d-none d-md-block" style={{alignSelf: "center"}}>
                <ProfileIcon id="1293560184108742"/>
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
        <div className="row pageTitle">
          <h2>{this.state.courseName}</h2>
        </div>
        <div className="row">
          {this.state.error.display === true &&
            <ErrorMessage error={this.state.error} />
          }

          <BookList books={this.state.books} />
        </div>
      </section>
    )
  }
}

export default Course