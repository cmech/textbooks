import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            department: {}
        }
    }

    componentDidMount() {
        const url = 'api/departments';

        fetch(url)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                this.setState({
                    departments: data
                })
            })
    }

    handleDepartmentChange(event) {
        this.setState({department: event.target.value})
    }

    DepartmentSelect(props) {
        const departments = props.departments;
        const options = departments.map((department) => (
            <option key={department.department_id} value={department.department_id}>
                {department.department}
            </option>
        ));
        return (
            <select onChange={this.handleDepartmentChange} value={this.state.department} id="departmentSelect" className="form-control mr-sm-2" >
                <option value={null}>--- Select Department ---</option>
                { options }
            </select>
        )
    }

    render() {
        return (
            <nav id="searchBar" className="navbar bg-light justify-content-center mb-4 box-shadow border-bottom">
                <form className="form-inline py-2" id="searchForm">
                    <input className="form-control" type="search" placeholder="Search by keyword" />
                    <small className="mx-4 pt-1 text-muted align-baseline">OR</small>
                    <this.DepartmentSelect departments={this.state.departments} />
                    <select className="form-control mr-sm-4" id="courseSelect"></select>
                    <button className="btn btn-outline-primary" type="submit">Search</button>
                </form>
                {/* { this.state.departments } */}
            </nav>
        );
    }
}

export default Search;
