import React, { Component } from 'react'
import GetFacebookUsername from '../components/GetFacebookUsername';

class Home extends Component {
  render() {
    return (
      <section className="container">
        <div className="row mb-3 border-bottom">
          <h3>Recently Added</h3>
        </div>
        <div className="row">
          <div className="col-sm">
              <div className="card"><img className="card-img-top" src="/images/book3.jpg" alt="Textbook"/></div>
          </div>
          <div className="col-sm">
              <div className="card"><img className="card-img-top" src="/images/book4.jpg" alt="Textbook"/></div>
          </div>
          <div className="col-sm">
              <div className="card"><img className="card-img-top" src="/images/book5.jpg" alt="Textbook"/></div>
          </div>
          <div className="col-sm">
              <div className="card"><img className="card-img-top" src="/images/book6.jpg" alt="Textbook"/></div>
          </div>
        </div>
        <GetFacebookUsername />

      </section>
    )
  }
}

export default Home