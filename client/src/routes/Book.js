import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { handleFetchError, ErrorMessage } from '../components/ErrorMessage'
import MessengerButton from '../components/MessengerButton'
import TimeAgo from 'timeago-react'
import Loading from '../components/Loading'
import ProfileIcon from '../components/ProfileIcon'
import PageTitle from '../components/PageTitle'
import BookMark from '../components/Bookmark'

class Book extends Component {
  constructor(props) {
    super(props)

    this.state = {
      book: {},
      error: {
        display: false,
        message: '',
        color: 'danger'
      },
      loading: true
    }

    this.handleFetchError = handleFetchError.bind(this)
  }

  fetchBook() {
    fetch('/api/books/' + this.props.match.params.bookId)
      .then(res => {
        if (res.status !== 200) {
          throw Error(res.status)
        } else {
          return res
        }
      })
      .then(res => res.json())
      .then(book =>
        this.setState({
          book,
          loading: false
        })
      )
      .catch(err => this.handleFetchError(err))
  }

  componentDidMount() {
    this.fetchBook()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
      this.setState({ loading: true, books: {} })
      this.fetchBook()
    }
  }

  render() {
    let book = this.state.book

    if (this.state.loading) {
      return <Loading />
    }
    if (this.state.error.display === true) {
      return <ErrorMessage error={this.state.error} />
    } else {
      return (
        <section className="container">
          <PageTitle title={book.title}>
            <BookMark book={this.state.book} />
          </PageTitle>
          <div className="row">
            <div className="col-md-4">
              <a href={`/bookImages/uncompressed/${book.imageID}`}>
                <img
                  className="bookPostingImg"
                  src={
                    book.imageID !== undefined
                      ? `/bookImages/compressed/${book.imageID}`
                      : '/images/no_picture.png'
                  }
                  alt="Textbook"
                />
              </a>
            </div>
            <div className="col-md-8 pl-4">
              <p className="mb-4">
                <span className="display-4 ">${book.price}</span>
              </p>

              <div className="card flex-md-row my-4">
                <div className="card-img-left flex-auto d-none d-lg-block align-self-center">
                  <ProfileIcon id={book.seller.fb} label={false} />
                </div>
                <div className="card-body d-flex flex-column align-items-start">
                  <p>
                    Posted by{' '}
                    <Link to={'/user/' + book.seller.id}>
                      {book.seller.name}
                    </Link>{' '}
                    <TimeAgo
                      datetime={book.datePosted}
                      locale="en"
                      live={false}
                    />
                  </p>
                  <MessengerButton id="calebmech" />
                </div>
              </div>
              <div className="mt-1">
                {book.courses.map(course => (
                  <Link
                    to={'/course/' + course.code.replace(' ', '_')}
                    key={course._id}
                  >
                    <span className="badge badge-pill badge-primary ml-1">
                      {course.code}
                    </span>
                  </Link>
                ))}
              </div>

              {/* <div className="row mt-4">
                                <div className="col-3">
                                <ProfileIcon id={book.seller.fb} />
                                </div>
                                <div className="col-9">
                                <p className="mt-4 mb-0">Posted by <Link to={'/user/'+book.seller.id}>{book.seller.name}</Link> <TimeAgo datetime={book.datePosted} locale='en' live={false} /></p>
                                <div className="mb-4 mt-1">
                                    {book.courses.map(course => <Link to={"/course/"+course.id} key={course.id}><span className="badge badge-pill badge-primary ml-1">{course.code}</span></Link>)}
                                </div>                                
                                </div>
                                </div> */}
            </div>
          </div>
        </section>
      )
    }
  }
}

export default Book
