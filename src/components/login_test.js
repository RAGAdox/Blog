import React from "react"
import { myFirebase, fireAuth } from "../config/firebase"
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
    }
    this.handelChange = this.handelChange.bind(this)
    this.login = this.login.bind(this)
    this.signup = this.signup.bind(this)
  }
  handelChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  login(event) {
    event.preventDefault()
    fireAuth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        console.log(user)
      })
      .catch(err => {
        console.log(err)
      })
  }
  signup(event) {
    event.preventDefault()
    fireAuth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        console.log(user)
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    return (
      <form>
        <input
          type="email"
          name="email"
          onChange={this.handelChange}
          placeholder="Enter email address"
          value={this.state.email}
        ></input>
        <input
          type="password"
          name="password"
          onChange={this.handelChange}
          placeholder="enter password"
          value={this.state.password}
        ></input>
        <button onClick={this.login}>Login</button>
        <button onClick={this.signup}>Signup</button>
      </form>
    )
  }
}
export default Login
