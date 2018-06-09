import React, { Component } from 'react'

class PageTitle extends Component {
  updateTitle() {
    let title = this.props.title
    document.title = title.replace('_', ' ') + ' | Textbooks'
  }
  componentDidMount() {
    this.updateTitle()
  }
  componentDidUpdate() {
    this.updateTitle()
  }
  render() {
    return (
      <div className="row pageTitle">
        <div className="col-10">
          <h2>{this.props.title}</h2>
          <h3 className="w-100 o-75 ">{this.props.subtitle}</h3>
        </div>
        <div className="col-2 d-flex justify-content-end align-items-re">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default PageTitle
