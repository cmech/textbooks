import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { handleFetchError, ErrorMessage } from '../components/ErrorMessage'
import MessengerButton from '../components/MessengerButton'
import TimeAgo from 'timeago-react'
import Loading from '../components/Loading'
import ProfileIcon from '../components/ProfileIcon'
import PageTitle from '../components/PageTitle'
import BookMark from '../components/Bookmark'
import { UserContext } from '../UserContext'

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
            <div className="col-md-8 pl-4">
              <div className="mb-4 d-flex justify-content-between align-content-center flex-md-row">
                <span className="display-4">${book.price}</span>
                {book.seller._id === this.props.user._id && (
                  <div className="align-self-center">
                    <Link to={`/post/${book._id}`}>
                      <i className="fas fa-pencil-alt h4 text-secondary" />
                    </Link>
                    <a href="#">
                      <i class="fas fa-trash h4 ml-3 text-secondary" />
                    </a>
                  </div>
                )}
              </div>

              <div className="card flex-md-row mt-4 bg-light">
                <div className="flex-auto d-none d-lg-block align-self-center ml-4 mr-2">
                  <ProfileIcon id={book.seller.fbID} label={false} />
                </div>
                <div className="card-body d-flex flex-column align-items-start">
                  <p>
                    Posted by{' '}
                    <Link to={'/user/' + book.seller._id}>
                      {book.seller.name}
                    </Link>{' '}
                    <TimeAgo
                      datetime={book.datePosted}
                      locale="en"
                      live={false}
                    />
                  </p>
                  <div className="d-flex">
                    <MessengerButton id="calebmech" />
                    {book.seller.email && (
                      <a
                        href={`mailto:${book.seller.email}`}
                        className="btn btn-secondary ml-3"
                      >
                        <i className="fas fa-envelope mr-2" />
                        Email
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-3 mb-4">
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
          </div>
        </section>
      )
    }
  }
}

export default props => (
  <UserContext.Consumer>
    {({ user }) => <Book {...props} user={user} />}
  </UserContext.Consumer>
)
