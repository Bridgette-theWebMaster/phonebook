import React, { Component } from "react";
import axios from "axios";
import BackButton from "../../buttons/BackButton";

export default class photoUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    const url = `https://sleepy-bastion-45973.herokuapp.com/upload`;
    const formData = new FormData();
    formData.append("image", this.state.file);
    const config = {
      headers: { jwtToken: localStorage.token },
    };
    axios
      .put(url, formData, config)

      .then((response) => {
        //console.log(response)
        alert("The file is successfully uploaded");
      })
      .catch((error) => {});
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  render() {
    return (
      <div className="Uploader">
        <form
          className="photoUpload"
          onSubmit={this.onFormSubmit}
          enctype="multipart/formdata"
        >
          <h1>Update Photo</h1>
          <input type="file" name="image" onChange={this.onChange} />
          <button type="submit">Upload</button>
        </form>
        <BackButton />
      </div>
    );
  }
}
