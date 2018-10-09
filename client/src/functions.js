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
