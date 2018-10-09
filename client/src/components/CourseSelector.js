import React, { Component } from 'react'
import withRouter from 'react-router-dom/withRouter'
import './CourseSelector.css'
import { Truncate } from '../functions'
import Select, { createFilter } from 'react-select'

class CourseSelector extends Component {
  constructor(props) {
    super(props)

    this.state = {
      departments: [],
      courses: [],
      department: '',
      course: {
        id: '',
        code: ''
      },
      loadingCourses: false
    }

    this.handleDepartmentChange = this.handleDepartmentChange.bind(this)
    this.handleCourseChange = this.handleCourseChange.bind(this)
  }

  fetchDepartments() {
    fetch('/api/departments')
      .then(res => res.json())
      .then(departments => {
        departments = departments.map(department => {
          return {
            _id: department._id,
            name: department.name,
            label: department.name,
            value: department._id
          }
        })
        this.setState({ departments })
      })
      .catch(err => console.error(err))
  }
  fetchCourses() {
    this.setState({ loadingCourses: true, courses: [] })
    fetch('/api/departments/' + this.state.department)
      .then(res => res.json())
      .then(courses => {
        courses = courses.map(course => {
          return {
            _id: course._id,
            title: course.title,
            label: course.code,
            value: course._id,
            code: course.code
          }
        })
        this.setState({
          courses,
          loadingCourses: false
        })
      })
      .catch(err => console.error(err))
  }

  handleDepartmentChange(e) {
    this.setState(
      {
        department: e.value,
        course: {}
      },
      () => this.fetchCourses()
    )
  }
  handleCourseChange(course) {
    this.setState({
      course
    })
  }

  componentDidMount() {
    this.fetchDepartments()
  }

  render() {
    const filterConfig = {
      matchProp: 'label'
    }
    return (
      <section className="form-inline CourseSelector">
        {/* <select
          name="department"
          id="departmentSelect"
          value={this.state.department}
          onChange={this.handleDepartmentChange}
          className="form-control mb-mdd-2"
        >
          <option value="0" defaultValue className="disabled">
            Select Department...
          </option>
          {this.state.departments.map(department => {
            return (
              <option value={department._id} key={department._id}>
                <Truncate length="30">{department.name}</Truncate>
              </option>
            )
          })}
        </select> */}

        <Select
          id="departmentSelect"
          options={this.state.departments}
          onChange={this.handleDepartmentChange}
          className="mb-mdd-2"
          placeholder="Select Department..."
          filterOption={createFilter(filterConfig)}
          // matchProp="label"
        />
        <Select
          id="courseSelect"
          options={this.state.courses}
          onChange={this.handleCourseChange}
          value={this.state.course}
          isLoading={this.state.loadingCourses}
          isDisabled={this.state.department === ''}
          closeMenuOnScroll={true}
          className="mr-3 ml-lg-3 mb-mdd-2"
          placeholder="Select Course..."
          filterOption={createFilter(filterConfig)}
          // matchProp="label"
        />
        {/* <select
          name="course"
          id="courseSelect"
          value={this.state.course.id}
          onChange={this.handleCourseChange}
          className="form-control ml-lg-3 mr-3"
        >
          <option value="0" defaultValue className="disabled">
            Select Course...
          </option>
          {this.state.loadingCourses && <option disabled>Loading...</option>}
          {this.state.courses.map(course => {
            return (
              <option
                value={course._id}
                key={course._id}
                id={'courseOption' + course._id}
              >
                {course.code}
              </option>
            )
          })}
        </select> */}

        <button
          type="submit"
          disabled={this.state.course.id === '' || this.state.course.id === '0'}
          onClick={e => this.props.submitFunc(e, this.state.course)}
          className="btn btn-secondary px-4 mb-mdd-2"
        >
          {this.props.action}
        </button>
      </section>
    )
  }
}

export default withRouter(CourseSelector)
