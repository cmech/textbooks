import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'
import './Sidebar.css'

class Sidebar extends Component {
  constructor(props) {
    super(props)

    this.handleLoggedIn = this.handleLoggedIn.bind(this)
  }

  handleLoggedIn(res) {
    console.log('handleLoggedIn', res)
    console.log(this)
  }

  render () {
    return (
      <div className="col-md-3">
              
            <Link to='/post'><button className="btn w-100 mb-4">Post book</button></Link>

              <div className="card mb-4">
                <div className="card-header">
                  Pinned Courses
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-md-9"><Link to='/course/2136'>MATH 1ZA3</Link></div>
                      <div className="col-md-3 text-right"><span className="badge badge-secondary">5</span></div>
                    </div>   
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-md-9"><Link to='/course/1039'>PHYSICS 1D04</Link></div>
                      <div className="col-md-3 text-right"><span className="badge badge-secondary">0</span></div>
                    </div>   
                  </li>                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-md-9"><Link to='/course/2280'>ENG 1D04</Link></div>
                      <div className="col-md-3 text-right"><span className="badge badge-secondary">12</span></div>
                    </div>   
                  </li>                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-md-9"><Link to='/course/1391'>CHEM 1E03</Link></div>
                      <div className="col-md-3 text-right"><span className="badge badge-secondary">3</span></div>
                    </div>   
                  </li>
                  {/* <li className="list-group-item"><Link to='/course/1039'>PHYSICS 1D03</Link> <span class="badge badge-secondary">0</span></li>
                  <li className="list-group-item"><Link to='/course/2280'>ENG 1D04</Link> <span class="badge badge-secondary">12</span></li>
                  <li className="list-group-item"><Link to='/course/1391'>CHEM 1E03</Link> <span class="badge badge-secondary">3</span></li> */}
                </ul>
              </div>

              <LoginForm test="yay" />

            </div>
    )
  }
}

export default Sidebar