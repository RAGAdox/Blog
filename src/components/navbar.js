import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext, useEffect } from "react"
import Search from "./search"
import { GlobalStateContext } from "../context/GlobalContextProvider"
import Login from "./Login"

/* */
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap"
import SearchExample from "./SearchExample"
const NavBar = ({ siteTitle, searchData }) => {
  const globalState = useContext(GlobalStateContext)
  const render = (
    <Navbar expand="lg" sticky="top">
      <Navbar.Brand>
        <Link to="/" className="navbar-brand">
          {siteTitle}
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          <Link to="/bloglist" className="nav-link">
            All Blogs
          </Link>
          <Link to="/page-2" className="nav-link">
            Contact
          </Link>

          {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
        <SearchExample></SearchExample>
      </Navbar.Collapse>
    </Navbar>
  )
  /*return (
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
  )*/
  return render
}

NavBar.propTypes = {
  siteTitle: PropTypes.string,
}

NavBar.defaultProps = {
  siteTitle: ``,
}

export default NavBar
