import React, { useContext, useState, useEffect } from "react"
import { fireAuth, firebaseAuthProvider } from "../config/firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { GlobalDispatchContext } from "../context/GlobalContextProvider"
const Login = props => {
  const globalDispatch = useContext(GlobalDispatchContext)

  const [state, setState] = useState({
    isSignedIn: false,
    authUser: null,
    authUserPic: null,
  })
  const uiConfig = {
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
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  }
  useEffect(() => {
    fireAuth.onAuthStateChanged(user => {
      // console.log(
      //   "is j Query working ",
      //   document.getElementById("exampleModal")
      //     ? document.getElementById("exampleModal")
      //     : "exampleModal Was not found"
      // )
      setState({
        ...state,
        isSignedIn: !!user,
        authUser: !!user ? user.displayName : null,
        authUserPic: !!user ? user.photoURL : null,
      })
      globalDispatch({
        type: "USER_SIGN_IN",
        payload: !!user
          ? {
              isSignedIn: !!user,
              displayName: user.displayName,
              photoUrl: user.photoURL,
            }
          : { isSignedIn: false },
      })
    })
  }, [])
  /*let render = (
    <>
      <div>
        {state.isSignedIn ? (
          <>
            <p>
              Hi, {state.authUser} <br />
              You are signed in
            </p>
            <img src={state.authUserPic}></img>
            <button onClick={() => fireAuth.signOut()}>Sign Out</button>
          </>
        ) : (
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={fireAuth} />
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
        </div> }
    </>
  )*/
  const componentRender = (
    <>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Login
      </button>
      {/* MOdal */}
      <div
        class="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-backdrop="false"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Login
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
            <div class="modal-body">
              {state.isSignedIn ? (
                <p>You are already signed in</p>
              ) : (
                <>
                  <p>
                    Sign in with user name password <br /> username <br />
                    password
                  </p>
                  <>
                    <StyledFirebaseAuth
                      uiConfig={uiConfig}
                      firebaseAuth={fireAuth}
                    />
                  </>
                </>
              )}
            </div>
            {/* <div class="modal-footer">
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
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
  return componentRender
}
export default Login
/*class Loginx extends React.Component {
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
        authUser: !!user ? user.displayName : null,
        authUserPic: !!user ? user.photoURL : null,
      })
    })
    console.log("dispatch in login :-", this.dispatch)
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
        </div> }
      </>
    )
  }
}
*/
