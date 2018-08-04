import React from 'react'

function ImageUpload(props) {
  return (
    <div className="input-group">
      <div className="input-group-prepend">
        <label htmlFor="bookImage" className="input-group-text">
          Image
        </label>
      </div>
      <input
        type="file"
        name="bookImage"
        id="bookImage"
        accept="image/*"
        className="form-control-file form-control"
        onChange={props.handleFileChange}
      />
    </div>
  )
}

export default ImageUpload
