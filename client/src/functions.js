<<<<<<< HEAD
export function handleGenericInputChange(e) {
  this.setState({
    [e.target.name]: e.target.value
  })
}

export function Truncate(props) {
  let text = props.children
  let length = props.length
  return text.length > length ? text.substring(0, length - 3) + '...' : text
}
=======
export function handleGenericInputChange(e) {
  this.setState({
    [e.target.name]: e.target.value
  })
}

export function Truncate(props) {
  let text = props.children
  let length = props.length
  return text.length > length ? text.substring(0, length - 3) + '...' : text
}
>>>>>>> 1924a4dbcf3480ddde1c442e6f989c392cee5dc8
