import React from "react"
import { fireAuth, firebaseAuthProvider } from "../config/firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSignedIn: false,
      authUser: null,
      authUserPic: null,
    }
  }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebaseAuthProvider
        ? firebaseAuthProvider.GoogleAuthProvider.PROVIDER_ID
        : null,
      firebaseAuthProvider
        ? firebaseAuthProvider.GithubAuthProvider.PROVIDER_ID
        : null,
      firebaseAuthProvider
        ? firebaseAuthProvider.FacebookAuthProvider.PROVIDER_ID
        : null,
    ],
  }
  componentDidMount = () => {
    fireAuth.onAuthStateChanged(user => {
      this.setState({
        isSignedIn: !!user,
        authUser: user.displayName,
        authUserPic: user.photoURL,
      })
    })
  }
  render() {
    return (
      <>
        <div>
          {this.state.isSignedIn ? (
            <>
              <p>
                Hi, {this.state.authUser} <br />
                You are signed in
              </p>
              <img src={this.state.authUserPic}></img>
              <button onClick={() => fireAuth.signOut()}>Sign Out</button>
            </>
          ) : (
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={fireAuth}
            />
          )}
        </div>
        {/* <div
          class="modal fade"
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Modal title
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">...</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </>
    )
  }
}
