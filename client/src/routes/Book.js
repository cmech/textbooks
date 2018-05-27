import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { handleFetchError, ErrorMessage } from '../components/ErrorMessage';
import MessengerButton from '../components/MessengerButton';
import TimeAgo from 'timeago-react'
import Loading from '../components/Loading';
import ProfileIcon from '../components/ProfileIcon';

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
                        {/* <div id="floater"></div> */}
                        <div className="row pageTitle">
                            <div className="col-10">
                                <h2>{book.title}</h2>
                            </div>
                            <div className="col-2 align-self-center-mdd text-right justify-content-center">
                                <a className="bookmarkIcon" href="#">
                                    <svg className="bookmarkOutline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2 2c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v18l-8-4-8 4V2zm2 0v15l6-3 6 3V2H4z"/></svg>
                                    <svg className="bookmarkSolid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2 2c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v18l-8-4-8 4V2z"/></svg>
                                    <svg className="bookmarkAdd" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2 2c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v18l-8-4-8 4V2zm2 0v15l6-3 6 3V2H4zm5 5V5h2v2h2v2h-2v2H9V9H7V7h2z"/></svg>
                                </a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <img className="bookPostingImg" src="/images/book6.jpg" alt="Textbook"/>
                            </div>
                            <div className="col-md-8 pl-4">
                                <p className="mb-4"><span className="display-4 ">${book.price}</span></p>
                                
                                <div class="card flex-md-row my-4">
                                    <div class="card-img-left flex-auto d-none d-lg-block align-self-center">
                                        <ProfileIcon id={book.seller.fb} label={false} />
                                    </div>
                                    <div class="card-body d-flex flex-column align-items-start">
                                        <p>Posted by <Link to={'/user/'+book.seller.id}>{book.seller.name}</Link> <TimeAgo datetime={book.datePosted} locale='en' live={false} /></p>
                                        <MessengerButton id='calebmech' />
                                    </div>
                                </div>
                                <div className="mt-1">
                                    {book.courses.map(course => <Link to={"/course/"+course.id} key={course.id}><span className="badge badge-pill badge-primary ml-1">{course.code}</span></Link>)}
                                </div>  

                                {/* <div className="row mt-4">
                                <div className="col-3">
                                <ProfileIcon id={book.seller.fb} />
                                </div>
                                <div className="col-9">
                                <p className="mt-4 mb-0">Posted by <Link to={'/user/'+book.seller.id}>{book.seller.name}</Link> <TimeAgo datetime={book.datePosted} locale='en' live={false} /></p>
                                <div className="mb-4 mt-1">
                                    {book.courses.map(course => <Link to={"/course/"+course.id} key={course.id}><span className="badge badge-pill badge-primary ml-1">{course.code}</span></Link>)}
                                </div>                                
                                </div>
                                </div> */}
                            </div>
                        </div>
                </section>
            )
        }
    }
}

export default Book