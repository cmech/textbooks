import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Course.css'
import { ErrorMessage, handleFetchError } from '../components/ErrorMessage'
import Loading from '../components/Loading'
import ProfileIcon from '../components/ProfileIcon'
import TimeAgo from 'timeago-react'
import PageTitle from '../components/PageTitle'
import CoursePin from '../components/CoursePin'
import { Truncate } from '../functions'

class Course extends Component {
  constructor(props) {
    super(props)

    this.state = {
      books: [],
      course: {},
      loading: true,
      error: {
        display: true,
        message: 'Error 500 - Internal server error.',
        color: 'warning'
      }
    }

    this.handleFetchError = handleFetchError.bind(this)
  }

  fetchBooks() {
    fetch('/api/books/course/' + this.props.match.params.courseCode)
      .then(res => {
        if (res.status !== 200) {
          throw Error(res.status)
        } else {
          return res
        }
      })
      .then(res => res.json())
      .then(data => {
        let error = {}
        if (data.books.length === 0) {
          error = {
            display: true,
            message: 'No books are on sale for this course.',
            color: 'secondary'
          }
          this.setState({ error })
        }
        this.setState({
          books: data.books,
          course: data.course,
          loading: false,
          error
        })
      })
      .catch(err => this.handleFetchError(err))
  }

  componentDidMount() {
    this.fetchBooks()
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.courseCode !== this.props.match.params.courseCode
    ) {
      this.setState({ loading: true, books: [], course: '' })
      this.fetchBooks()
    }
  }

  render() {
    return (
      <section className="container">
        <PageTitle
          title={this.props.match.params.courseCode.replace('_', ' ')}
          subtitle={this.state.course.title || '· · ·'}
        >
          {this.state.course._id !== undefined && (
            <CoursePin course={this.state.course} />
          )}
        </PageTitle>
        <div className="row">
          {this.state.loading ? (
            <Loading />
          ) : this.state.error.display === true ? (
            <ErrorMessage error={this.state.error} />
          ) : (
            <BookList books={this.state.books} />
          )}
        </div>
      </section>
    )
  }
}

function BookList(props) {
  return (
    <div className="BookList w-100">
      {props.books.map(book => {
        return (
          <div className="card flex-row mb-3 bookListCard" key={book._id}>
            <Link to={'/book/' + book._id}>
              <img
                height="155"
                src={
                  book.imageID !== undefined
                    ? `/bookImages/compressed/${book.imageID}`
                    : '/images/no_picture.png'
                }
                alt="Textbook"
                className="card-img-right flex-auto d-none d-block"
              />
            </Link>
            <div className="card-body d-flex flex-column align-items-start">
              <h5 className="card-title mb-1">
                <Link className="text-dark" to={'/book/' + book._id}>
                  <Truncate length="60">{book.title}</Truncate>
                </Link>
              </h5>
              <p className="text-secondary mb-1">
                Posted{' '}
                <TimeAgo
                  className="text-secondary"
                  datetime={book.datePosted}
                  locale="en"
                  live={false}
                />
              </p>
              <div className="card-text">
                <span className="mt-2 h3">${book.price}</span>
              </div>

              {/* <div className="card-footer">
                </div> */}
            </div>
            {book.seller != null && (
              <div
                className="profileIcon mr-4 d-none d-md-block"
                style={{ alignSelf: 'center' }}
              >
                <ProfileIcon
                  id={book.seller.fbID}
                  name={book.seller.name.split(' ')[0]}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Course
