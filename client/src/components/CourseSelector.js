import React, { Component } from 'react'
import withRouter from 'react-router-dom/withRouter';

class CourseSelector extends Component {
  constructor(props) {
    super(props)

    this.state = {
      departments: [],
      courses: [],
      department: "",
      course: {
        id: "",
        code: ""
      },
      loadingCourses: false
    }
    
    
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this)
    this.handleCourseChange = this.handleCourseChange.bind(this)
  }
  
  fetchDepartments() {
    fetch("/api/departments")
      .then(res => res.json())
      .then(departments => this.setState({departments}))
    // this.setState({
    //   data: {
    //     departments: [
    //       {
    //         id: 1,
    //         name: "Mathematics"
    //       },
    //       {
    //         id: 2,
    //         name: "Engineering"
    //       },
    //       {
    //         id: 3,
    //         name: "Physics"
    //       }
    //     ],
    //     courses: [
    //       {
    //         id: 1,
    //         department_id: 1,
    //         code: "MATH 1ZB3"
    //       },
    //       {
    //         id: 2,
    //         department_id: 2,
    //         code: "ENG 1D04"
    //       }
    //     ]
    //   }
    // }) 
  }
  fetchCourses() {
    this.setState({ loadingCourses: true })
    fetch("/api/departments/"+this.state.department+"/courses")
      .then(res => res.json())
      .then(courses => this.setState({
        courses,
        loadingCourses: false
      }))
  }

  handleDepartmentChange(e) {
    this.setState({
      department: e.target.value
    }, () => this.fetchCourses())    
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
          className="form-control"
        >
          <option value="0">-- Select Department --</option>
          {this.state.departments.map(department => {
            let name = department.name

            if(name.length > 30) {
              name = name.substring(0, 30-3)+"..."
            }

            return (
              <option value={department.id} key={department.id}>
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
          className="form-control"
          disabled={this.state.loadingCourses}
        >
          <option value="0">-- Select Course --</option>
          {this.state.courses
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
          className="btn"
        >
          {this.props.action}
        </button>
      </section>
    )
  }
}

export default withRouter(CourseSelector)