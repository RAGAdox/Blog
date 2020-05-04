import React from "react"
import { myFirebase, fireAuth } from "../config/firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSignedIn: false,
    }
    }
    uiConfig = {
        signIn
    }
  render() {
    return (
      <div>
        {this.state.isSignedIn ? (
          <p>You are signed in</p>
        ) : (
          <p>Not Signed in</p>
        )}
      </div>
    )
  }
}
