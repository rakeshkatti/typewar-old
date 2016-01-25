import React from "react";
import {renderContainer} from "./renderContainer";

export default React.createClass({
  getInitialState() {
    return {
      username:""
    }
  },
  login() {
    let request = new XMLHttpRequest();
    let username = this.state.username;
    let data = {
      username: this.state.username
    }
    request.open('POST', 'http://localhost:8000/login');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(data));
    request.onreadystatechange = () => {
      try {
          var response = JSON.parse(request.response);
      } catch (e) {
          console.log("Error parsing JSON");
      }
      if (request.readyState == XMLHttpRequest.DONE) {
        localStorage.setItem("username", response.username);
        renderContainer();
        console.log(response);
      }
    }
    request.onerror = (error) => {
      console.log(error);
    }
  },
  handleChange(event) {
    this.setState({username: event.target.value});
  },
  render() {
    return (
      <div>
      <input value={this.state.username} onChange={this.handleChange} />
      <button onClick={this.login}>Login</button>
      </div>
    );
  }
});
