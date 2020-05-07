import React from "react"
import { Link } from "gatsby"
import { graphql, StaticQuery } from "gatsby"

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
            thumbnailImage
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

    <h2>Latest Posts :-</h2>

    <StaticQuery
      query={indexQuery}
      render={data => {
        //console.log(data)

        return (
          <div className="row">
            {data.allMarkdownRemark.edges.slice(0, 4).map(({ node }) => {
              return (
                <PostPreview
                  key={node.id}
                  title={node.frontmatter.title}
                  date={node.frontmatter.date}
                  author={node.frontmatter.author}
                  body={node.excerpt}
                  slug={node.fields.slug}
                  tags={node.frontmatter.tags}
                  thumbnailImage={node.frontmatter.thumbnailImage}
                  // fluid={node.frontmatter.image.childImageSharp.fluid}
                />
              )
            })}
          </div>
        )
      }}
    />

    <Link to="/blogList">
      <p className="row d-flex justify-content-center">Load More</p>
    </Link>
  </Layout>
)

export default IndexPage
