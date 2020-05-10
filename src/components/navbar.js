import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext, useEffect } from "react"
import Search from "./search"
import { GlobalStateContext } from "../context/GlobalContextProvider"
import Login from "./Login"
const NavBar = ({ siteTitle, searchData }) => {
  const globalState = useContext(GlobalStateContext)
  return (
    <nav
      className="navbar navbar-expand-lg  navbar-fixed-top"
      id="mainNav"
      style={{
        paddingBottom1: `1.45rem`,
        marginBottom: "1.45rem",
      }}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          {siteTitle}
        </Link>
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blogList">
                All Blogs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/page-2">
                Contact
              </Link>
            </li>
            <Search data={searchData}></Search>
            <li className="nav-item">
              {!!globalState && globalState.isSignedIn ? (
                <p>{globalState.authUser}</p>
              ) : (
                <Login></Login>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

NavBar.propTypes = {
  siteTitle: PropTypes.string,
}

NavBar.defaultProps = {
  siteTitle: ``,
}

export default NavBar
