var departmentSelect = document.getElementById("departmentSelect")
var courseSelect = document.getElementById("courseSelect")
var searchForm = document.getElementById("searchForm")

// loadCourses.call(departmentSelect)

departmentSelect.addEventListener('change', loadCourses)
searchForm.addEventListener('submit', search)

function loadCourses(e) {
    if(this.selectedIndex != 0) {
        fetch("/api/departments/"+this.options[this.selectedIndex].dataset.id+"/courses")
            .then((res) => {
                return res.json()
            })
            .then( (data) => {
                courseSelect.innerHTML = ""
                data.forEach(course => {
                    var option = document.createElement('option')
                    option.dataset.id = course.course_id
                    option.appendChild(document.createTextNode(course.course))
                    courseSelect.appendChild(option)
                });
            })
    } else {
        courseSelect.innerHTML = ""
    }
}

function search(e) {
    e.preventDefault()
    console.log(e) 
    window.location.href = '/courses/' + courseSelect.options[courseSelect.selectedIndex].dataset.id
}

function truncateText(str, length, ending) {
    if (length == null) {
        length = 100;
    }
    if (ending == null) {
        ending = '...';
    }
    if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
    } else {
        return str;
    }
};