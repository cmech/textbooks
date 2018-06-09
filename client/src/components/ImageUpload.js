import React, { Component } from 'react'

class ImageUpload extends Component {
  constructor(props) {
    super(props)

    this.state = {
      over: false
    }

    this.handleDragOver = this.handleDragOver.bind(this)
  }

  getClasses() {
    let over = this.state.over ? 'bg-secondary' : 'bg-light'
    return 'imageUpload p-5 text-white w-25 text-center ' + over
  }

  handleDragOver(e) {
    console.log(e.target)
    this.setState(prevState => {
      return { over: !prevState.over }
    })
  }

  render() {
    return (
      <div className={this.getClasses()} onDragOver={this.handleDragOver} drag>
        +
      </div>
    )
  }
}

export default ImageUpload
