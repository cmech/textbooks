import React, { Component } from 'react'
import './Loading.css'

class Loading extends Component {
    componentDidMount() {
        let i=0
        this.loadingCycle = setInterval(() => {
            let circles = document.getElementById('loadingIndicator').children
            circles[i%3].classList.add('active')
            circles[Math.abs((i-1)%3)].classList.remove('active')
            i++
        }, 300)
    }
    componentWillUnmount() {
        clearInterval(this.loadingCycle)
    }
    render() {
        return (
            <div className="container" id="loadingIndicator">
                <span className="loadingCircle">&#8226;</span>
                <span className="loadingCircle">&#8226;</span>
                <span className="loadingCircle">&#8226;</span>
            </div>
        )
    }
}

export default Loading