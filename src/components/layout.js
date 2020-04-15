/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Helmet from "react-helmet"
import PropTypes, { node } from "prop-types"
import { useStaticQuery, withPrefix, graphql, StaticQuery } from "gatsby"

import Header from "./header"
import NavBar from "./navbar"
import PostPreview from "./postpreview"
import "./layout.scss"
import "../css/bootstrap.min.css"

const Layout = ({ children }) => {
  /*const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)*/
  const indexQuery = graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            id
            frontmatter {
              title
              date
              author
              path
              tags
              image {
                childImageSharp {
                  fluid(maxWidth: 600) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            excerpt
          }
        }
      }
    }
  `

  return (
    <>
      <StaticQuery
        query={indexQuery}
        render={data => {
          return <NavBar siteTitle={data.site.siteMetadata.title}></NavBar>
        }}
      />

      <div className="container">
        {/* <main>{children}</main> */}
        <StaticQuery
          query={indexQuery}
          render={data => {
            //console.log(data)
            return (
              <div className="row">
                {data.allMarkdownRemark.edges.map(({ node }) => {
                  return (
                    <PostPreview
                      key={node.id}
                      title={node.frontmatter.title}
                      date={node.frontmatter.date}
                      author={node.frontmatter.author}
                      path={node.frontmatter.path}
                      body={node.excerpt}
                      tags={node.frontmatter.tags}
                      fluid={node.frontmatter.image.childImageSharp.fluid}
                    />
                  )
                })}
              </div>
            )
          }}
        />
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
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
        {/* <script src='' type="text/javascript" />
        <script src={withPrefix("bootstrap.min.js")} type="text/javascript" /> */}
      </Helmet>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
