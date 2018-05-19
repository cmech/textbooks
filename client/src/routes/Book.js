import React, { Component } from 'react'
import { handleFetchError, ErrorMessage } from '../components/ErrorMessage';

class Book extends Component {
    constructor(props) {
        super(props)

        this.state = {
            book: {},
            error: {
                display: false,
                message: "",
                color: "danger"
            },
            loading: true,
        }

        this.handleFetchError = handleFetchError.bind(this)
    }


    fetchBook() {
        fetch('/api/books/'+this.props.match.params.bookId)
            .then(res => { 
                if(res.status !== 200) {
                    throw Error(res.status)
                } else {
                    return res 
                }
            })
            .then(res => res.json())
            .then(book => this.setState({
                book,
                loading: false,
            }))
            .catch(err => this.handleFetchError(err))
    }

    componentDidMount() {
        this.fetchBook()
    }

    render() {
        let book = this.state.book

        if(this.state.loading)  {
            return <h2>Loading</h2>
        }
        return (
            <section className="container">
                <h2 className="pageTitle">{book.title}</h2>

                {this.state.error.display === true &&
                    <ErrorMessage error={this.state.error} />
                }

                <p>Posted: {book.datePosted}</p>
                <p>Price: ${book.price}</p>
            </section>


        )
    }
}

export default Book