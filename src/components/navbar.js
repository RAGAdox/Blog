import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const NavBar = ({ siteTitle }) => (
  <nav
    className="navbar navbar-expand-lg navbar-light "
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
            <Link className="nav-link" to="/">
              Sample Post
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
)

NavBar.propTypes = {
  siteTitle: PropTypes.string,
}

NavBar.defaultProps = {
  siteTitle: ``,
}

export default NavBar
