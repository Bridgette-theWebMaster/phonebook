import React, { Component } from "react";
import axios from "axios";
import BackButton from "../../buttons/BackButton";
import { toast } from "react-toastify";

export default class PhotoUploader extends Component {
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
    const id = this.props.match.params.id;
    const url = `https://sleepy-bastion-45973.herokuapp.com/api/contacts/${id}/upload`;
    const formData = new FormData();
    formData.append("image", this.state.file);
    const config = {
      headers: { jwtToken: localStorage.token },
    };
    axios
      .put(url, formData, config)

      .then((response) => {
        console.log(response);
        toast.dark("Photo upload successful");
      })
      .catch((error) => {
        console.log(error.message);
      });
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
          <h2>Update Picture</h2>
          <input type="file" name="image" onChange={this.onChange} />
          <button type="submit">Upload</button>
        </form>
        <BackButton />
      </div>
    );
  }
}
