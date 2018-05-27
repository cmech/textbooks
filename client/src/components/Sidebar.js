import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'
import Loading from './Loading'
import './Sidebar.css'

class Sidebar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: null
    }

    this.authenticate = this.authenticate.bind(this)
  }

  authenticate() {
    fetch('/authenticate', {credentials: 'include'})
    .then(res => {
        if(res.status===200) {
          this.setState({ loggedIn: true })
        } else {
          this.setState({ loggedIn: false })
        }
    })
    
  }

  componentDidMount() {
    this.authenticate()
  }

  render () {
    if(this.state.loggedIn === null) {
      return <div className="col-md-3"><Loading /></div>
    } else if(this.state.loggedIn === false) {
      return (
        <div className="col-md-3">               
          <LoginForm authenticate={this.authenticate} />
        </div>
      )
    } else if(this.state.loggedIn === true) {
      return (
        <div className="col-lg-3"> 
          <Link to='/post'>
          <button className="btn w-100 mb-4">Post book</button>
          </Link>

          <div className="card mb-4">
              <div className="card-header">
                  Pinned Courses
              </div>
              <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                      <div className="row">
                          <div className="col-9">
                              <Link to='/course/2136'>MATH 1ZA3</Link>
                          </div>
                          <div className="col-3 text-right"><span className="badge badge-gold text-white">5</span></div>
                      </div>
                  </li>
                  <li className="list-group-item">
                      <div className="row">
                          <div className="col-9">
                              <Link to='/course/1039'>PHYSICS 1D04</Link>
                          </div>
                          <div className="col-3 text-right"><span className="badge badge-gold text-white">0</span></div>
                      </div>
                  </li>
                  <li className="list-group-item">
                      <div className="row">
                          <div className="col-9">
                              <Link to='/course/2280'>ENG 1D04</Link>
                          </div>
                          <div className="col-3 text-right"><span className="badge badge-gold text-white">12</span></div>
                      </div>
                  </li>
                  <li className="list-group-item">
                      <div className="row">
                          <div className="col-9">
                              <Link to='/course/1391'>CHEM 1E03</Link>
                          </div>
                          <div className="col-3 text-right"><span className="badge badge-gold text-white">3</span></div>
                      </div>
                  </li>
                  {/*
                  <li className="list-group-item">
                      <Link to='/course/1039'>PHYSICS 1D03</Link> <span class="badge badge-secondary">0</span></li>
                  <li className="list-group-item">
                      <Link to='/course/2280'>ENG 1D04</Link> <span class="badge badge-secondary">12</span></li>
                  <li className="list-group-item">
                      <Link to='/course/1391'>CHEM 1E03</Link> <span class="badge badge-secondary">3</span></li> */}
              </ul>
          </div>
        </div>
      )
    }
    
  }
}

export default Sidebar