import React from "react"
import { Link } from "gatsby"
import { useStaticQuery, withPrefix, graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/markdownComponents/image"
import PostPreview from "../components/postpreview"
import SEO from "../components/seo"
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
          fields {
            slug
          }
          frontmatter {
            title
            date
            author
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 600, maxHeight: 600) {
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
const IndexPage = () => (
  <Layout>
    <SEO title="Home" />

    <div className="row d-flex justify-content-center">
      <h2>Latest Posts :-</h2>
      <StaticQuery
        query={indexQuery}
        render={data => {
          //console.log(data)

          return (
            <div className="row">
              {data.allMarkdownRemark.edges.slice(0, 3).map(({ node }) => {
                return (
                  <PostPreview
                    key={node.id}
                    title={node.frontmatter.title}
                    date={node.frontmatter.date}
                    author={node.frontmatter.author}
                    body={node.excerpt}
                    slug={node.fields.slug}
                    tags={node.frontmatter.tags}
                    fluid={node.frontmatter.image.childImageSharp.fluid}
                  />
                )
              })}
            </div>
          )
        }}
      />
      <p>Load More</p>
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
