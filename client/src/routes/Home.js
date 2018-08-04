import React, { Component } from 'react'
import PageTitle from '../components/PageTitle'

class Home extends Component {
  render() {
    return (
      <section className="container">
        <PageTitle title="" />
        <div className="row mb-3">
          <h2 className="h3">Bookmarks</h2>
        </div>
        <div className="row">
          <div className="col-sm">
            <div className="card">
              <img
                className="card-img-top"
                src="/images/book3.jpg"
                alt="Textbook"
              />
            </div>
          </div>
          <div className="col-sm">
            <div className="card">
              <img
                className="card-img-top"
                src="/images/book4.jpg"
                alt="Textbook"
              />
            </div>
          </div>
          <div className="col-sm">
            <div className="card">
              <img
                className="card-img-top"
                src="/images/book5.jpg"
                alt="Textbook"
              />
            </div>
          </div>
          <div className="col-sm">
            <div className="card">
              <img
                className="card-img-top"
                src="/images/book6.jpg"
                alt="Textbook"
              />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Home
