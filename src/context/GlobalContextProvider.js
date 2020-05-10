import React from "react"

export const GlobalStateContext = React.createContext()
export const GlobalDispatchContext = React.createContext()

let initialState = {
  isSignedIn: false,
  authUser: null,
  authUserPic: null,
}
function reducer(state, action) {
  switch (action.type) {
    case "USER_SIGN_IN":
      if (action.payload.isSignedIn)
        return {
          ...state,
          isSignedIn: action.payload.isSignedIn,
          authUserPic: action.payload.photoUrl,
          authUser: action.payload.displayName,
        }
      break

    default:
      throw new Error("Bad Action Type")
  }
}

const GlobalContextProvider = ({ children }) => {
  let [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}
export default GlobalContextProvider
