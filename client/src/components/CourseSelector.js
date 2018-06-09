import React, { Component } from 'react'
import withRouter from 'react-router-dom/withRouter'
import './CourseSelector.css'

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
      .then(departments => this.setState({ departments }))
      .catch(err => console.error(err))
  }
  fetchCourses() {
    this.setState({ loadingCourses: true })
    fetch('/api/departments/' + this.state.department)
      .then(res => res.json())
      .then(courses =>
        this.setState({
          courses,
          loadingCourses: false
        })
      )
      .catch(err => console.error(err))
  }

  handleDepartmentChange(e) {
    this.setState(
      {
        department: e.target.value
      },
      () => this.fetchCourses()
    )
  }
  handleCourseChange(e) {
    this.setState({
      course: {
        id: e.target.value,
        code: e.target.children.namedItem('courseOption' + e.target.value)
          .innerText
      }
    })
  }

  componentDidMount() {
    this.fetchDepartments()
  }

  render() {
    return (
      <section className="form-inline CourseSelector">
        <select
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
            let name = department.name

            if (name.length > 30) {
              name = name.substring(0, 30 - 3) + '...'
            }

            return (
              <option value={department._id} key={department._id}>
                {name}
              </option>
            )
          })}
        </select>

        <select
          name="course"
          id="courseSelect"
          value={this.state.course.id}
          onChange={this.handleCourseChange}
          className="form-control ml-lg-3 mr-3"
        >
          <option value="0" defaultValue className="disabled">
            Select Course...
          </option>
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
        </select>

        <button
          type="submit"
          disabled={this.state.course.id === '' || this.state.course.id === '0'}
          onClick={e => this.props.submitFunc(e, this.state.course)}
          className="btn btn-secondary px-4"
        >
          {this.props.action}
        </button>
      </section>
    )
  }
}

export default withRouter(CourseSelector)
