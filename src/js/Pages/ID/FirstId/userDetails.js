import React, { Component } from "react";
import Form from "../../../Component/FormInput/Form";
import FormInput from "../../../Component/FormInput/FormInput";
import axios from "axios";

const inputs = [
  {
    name: "socialsecuritynumber",
    type: "text",
    label: "SSN",
    required: true,
  },
];

class userDetails extends Component {
  constructor(props) {
    super(props);
    this.state = inputs.reduce(
      (acc, input) => {
        return { ...acc, [input.name]: "" };
      },
      {
        socialsecuritynumber: "",
        idExist: true,
      }
    );
  }

  handelChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const data = this.state;

    console.log(id, data);
    axios
      .post(`https://graduationproject1.herokuapp.com/id/AddId/${id}`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    console.log(this.props);

    const list = inputs.map((input) => {
      return (
        <FormInput
          name={input.name}
          key={input.name}
          type={input.type}
          value={this.state[input.name]}
          label={input.label}
          handelChange={this.handelChange}
          disabled={input.disabled}
          required={input.required}
        />
      );
    });

    return (
      <div className="main_container">
        <Form
          title="Order birth certificate for child"
          handleSubmit={this.handleSubmit}
          list={list}
          button={1}
        />
      </div>
    );
  }
}

export default userDetails;
