import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { handleFetchError, ErrorMessage } from '../components/ErrorMessage';
import MessengerButton from '../components/MessengerButton';
import TimeAgo from 'timeago-react'
import Loading from '../components/Loading';

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
            return <Loading />
        }
        if(this.state.error.display === true) {
            return <ErrorMessage error={this.state.error} />
        } else {
            return (
                <section className="container">
                    <h2 className="pageTitle">{book.title}</h2>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card"><img className="card-img-top" src="/images/book3.jpg" alt="Textbook"/></div>
                            </div>
                            <div className="col-md-8">
                                <p><span className="display-4 mb-5">${book.price}</span></p>
                                
                                <p className="m-0">Posted by <Link to={'user/'+book.seller.id}>{book.seller.name}</Link> <TimeAgo datetime={book.datePosted} locale='en' live={false} /></p>
                                <div className="mb-4">
                                    {book.courses.map(course => <Link to={"/course/"+course.id} key={course.id}><span className="badge badge-pill badge-primary ml-1">{course.code}</span></Link>)}
                                </div>                                
                                <MessengerButton id={book.seller.fb} />
                            </div>
                        </div>
                </section>
            )
        }
    }
}

export default Book