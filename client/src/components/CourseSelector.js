import React, { Component } from 'react'
import withRouter from 'react-router-dom/withRouter';

class CourseSelector extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        departments: [],
        courses: []
      },
      department: "",
      course: {
        id: "",
        code: ""
      }
    }
    
    
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this)
    this.handleCourseChange = this.handleCourseChange.bind(this)
  }
  
  fetchData() {
    this.setState({
      data: {
        departments: [
          {
            id: 1,
            name: "Mathematics"
          },
          {
            id: 2,
            name: "Engineering"
          },
          {
            id: 3,
            name: "Physics"
          }
        ],
        courses: [
          {
            id: 1,
            department_id: 1,
            code: "MATH 1ZB3"
          },
          {
            id: 2,
            department_id: 2,
            code: "ENG 1D04"
          }
        ]
      }
    }) 
  }
  handleDepartmentChange(e) {
    this.setState({
      department: e.target.value
    })
  }
  handleCourseChange(e) {
    this.setState({ 
      course: {
        id: e.target.value,
        name: e.target.children.namedItem("courseOption"+e.target.value).innerText
      }
    })
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    return (
      <section>
        <select 
          name="department" 
          id="departmentSelect" 
          value={this.state.department} 
          onChange={this.handleDepartmentChange}
        >
          <option value="0">-- Select Department --</option>
          {this.state.data.departments.map(department => {
            return (
              <option value={department.id} key={department.id}>{department.name}</option>
            )
          })}
        </select>
          
        <select 
          name="course" 
          id="courseSelect"
          value={this.state.course.id}
          onChange={this.handleCourseChange}
        >
          <option value="0">-- Select Course --</option>
          {this.state.data.courses
            .filter(course => course.department_id === parseInt(this.state.department, 10))
            .map(course => {
              return (
                <option value={course.id} key={course.id} id={"courseOption"+course.id}>{course.code}</option>
              )
            })
          }
        
        </select>

        <button 
          type="submit" 
          disabled={this.state.course.id === "" || this.state.course.id ==="0"}
          onClick={(e) => this.props.submitFunc(e, this.state.course)}
        >
          {this.props.action}
        </button>
      </section>
    )
  }
}

export default withRouter(CourseSelector)