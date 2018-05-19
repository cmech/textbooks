import React, { Component } from 'react'

class Book extends Component {
    constructor(props) {
        super(props)

        this.state = {
            book: {}
        }
    }


    fetchBook() {
        fetch('/api/books/'+this.props.match.params.bookId)
            .then(res => res.json())
            .then(book => this.setState({book}))
    }

    componentDidMount() {
        this.fetchBook()
    }

    render() {
        let book = this.state.book

        return (
            <section className="container">
                <h2>{book.title}</h2>
                <p>Posted: {book.datePosted}</p>
                <p>Price: ${book.price}</p>
            </section>


        )
    }
}

export default Book