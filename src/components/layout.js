/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect, useContext } from "react"
import Helmet from "react-helmet"
import PropTypes, { node } from "prop-types"
import { useStaticQuery, withPrefix, graphql, StaticQuery } from "gatsby"
import { transformData } from "../utils/utilityFunctions"
import Header from "./header"
import NavBar from "./navbar"
import PostPreview from "./postpreview"
import Search from "./search"
import "./layout.scss"
import "../css/bootstrap.min.css"
import { fireAuth } from "../config/firebase"
import { GlobalDispatchContext } from "../context/GlobalContextProvider"

const Layout = ({ children }) => {
  const globalDispatch = useContext(GlobalDispatchContext)
  const layoutQuery = graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              tags
              title
              author
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `
  useEffect(() => {
    fireAuth.onAuthStateChanged(user => {
      console.log("onAuthStateChanged called from Layout")
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
  let show = children[0].props.title == "Home" ? "show" : ""
  return (
    <>
      <Helmet>
        <body className="body"></body>
      </Helmet>

      <StaticQuery
        query={layoutQuery}
        render={data => {
          return (
            <>
              <NavBar
                siteTitle={data.site.siteMetadata.title}
                searchData={data.allMarkdownRemark.edges}
              ></NavBar>
            </>
          )
        }}
      />
      <section className={"home " + show}>
        <div className="container">
          {/* <Login></Login> */}
          <div className="row">
            <div className="col-sm" style={{ top: "20vh" }}>
              <h3>Introducing</h3>
              <h1 className="d-flex justify-content-center">TechieBloger</h1>
            </div>

            <div className="col-sm" style={{ top: "30vh" }}>
              <h3 className="d-flex justify-content-start">Exploring Ideas</h3>
              <h3 className="d-flex justify-content-center">
                Following Passion
              </h3>
              <h3 className="d-flex justify-content-end">Sharing Knowledge</h3>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        {console.log("children", children[0].props.title)}
        <main>{children}</main>

        <footer>
          © {new Date().getFullYear()}, Built by
          {` `}
          RAGAdox
        </footer>
      </div>
      <Helmet>
        <script
          src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
          integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
          integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
          integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
          crossorigin="anonymous"
        ></script>
        <script src={withPrefix("script.js")} type="text/javascript" />
        {/*<script src={withPrefix("bootstrap.min.js")} type="text/javascript" /> */}
      </Helmet>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
