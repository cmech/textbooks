import React, { Component } from 'react';
import './Header.css'
import Search from './Search'

class Header extends Component {
    render() {
        return (
            <header>
                <div className="py-4 text-center text-white bg-primary">
                    <h1>Textbooks</h1>
                </div>
                <Search />
            </header>
        )
    }
}

export default Header;