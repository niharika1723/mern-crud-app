import React, { Component } from "react";
import axios from "axios";
import { setErrors } from "./../conmmon/setErrors";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      category: "",
      errors: {},
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  validate = (title, description, category) => {
    const errors = setErrors(title, description, category);
    this.setState({ errors: errors });
    return Object.values(errors).every((err) => err === "");
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { title, description, category } = this.state;
    if (this.validate(title, description, category)) {
      const data = {
        title: title,
        description: description,
        postCategory: category,
      };
      console.log(data);
      axios.post("/posts/add", data).then((res) => {
        if (res.data.success) {
          alert("Added");
          this.setState({ title: "", description: "", category: "" });
        }
      });
    }
  };

  render() {
    return (
      <div className="col-md-10 mt-3 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">CREATE NEW POST</h1>
        <form className="needs-validation" novalidate>
          <div className="form-group">
            <label>TITLE</label>
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Enter title"
              value={this.state.title}
              onChange={this.handleInputChange}
            />
            {this.state.errors.title && (
              <div className="text-danger">{this.state.errors.title}</div>
            )}
          </div>

          <div className="form-group">
            <label>CATEGORY</label>
            <input
              type="text"
              className="form-control"
              name="category"
              placeholder="Enter category"
              value={this.state.category}
              onChange={this.handleInputChange}
            />
            {this.state.errors.category && (
              <div className="text-danger">{this.state.errors.category}</div>
            )}
          </div>

          <div className="form-group">
            <label>DESCRIPTION</label>
            <CKEditor
              editor={ClassicEditor}
              data={this.state.category}
              onChange={(event, editor) => {
                const data = editor.getData();
                this.setState({ description: data });
              }}
            />
            {this.state.errors.description && (
              <div className="text-danger">{this.state.errors.description}</div>
            )}
          </div>

          <button
            className="btn btn-success"
            type="submit"
            onClick={this.onSubmit}
          >
            <i className="far fa-check-square"></i>
            &nbsp;Submit
          </button>
        </form>
      </div>
    );
  }
}

export default CreatePost;
