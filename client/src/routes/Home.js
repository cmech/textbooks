import React, { Component } from 'react'
import PageTitle from '../components/PageTitle'
import { UserContext } from '../UserContext'
import { Link } from 'react-router-dom'
// import Bookmarks from '../components/Bookmarks'

function RecentBooks(props) {
  return (
    <div className="row">
      {props.books.map(book => {
        return (
          <div className="col px-2" key={book._id}>
            <div className="card">
              <Link to={`/book/${book._id}`}>
                <img
                  className="card-img-top"
                  src={`/bookImages/compressed/${book.imageID}`}
                  alt="Textbook"
                />
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}

class Home extends Component {
  constructor() {
    super()

    this.state = {
      recentBooks: []
    }
  }

  componentDidMount() {
    fetch('/api/books/recent/4')
      .then(res => res.json())
      // .then(results => console.log(results))
      .then(results => this.setState({ recentBooks: results }))
  }

  render() {
    console.log(this.state.recentBooks)
    return (
      <section className="container pageTitleBlank">
        <PageTitle title="" />
        <div className="row mb-5">
          <h2 className="h3 font-weight-bold mb-4">Newly Added Books</h2>
          {this.state.recentBooks.length > 0 && (
            <RecentBooks books={this.state.recentBooks} />
          )}
        </div>
        {this.props.user._id.length > 0 && (
          <div
            className="row my-5
          "
          >
            <h2 className="h3 font-weight-bold mb-4">Your Books</h2>
            {this.state.recentBooks.length > 0 && (
              <RecentBooks books={this.state.recentBooks} />
            )}
          </div>
        )}
      </section>
    )
  }
}

export default props => (
  <UserContext.Consumer>
    {({ user }) => <Home {...props} user={user} />}
  </UserContext.Consumer>
)
