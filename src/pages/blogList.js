import React from "react"
import { Link, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostPreview from "../components/postpreview"
const indexQuery = graphql`
  query {
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
const blogList = () => (
  <Layout>
    <SEO title="Page two" />
    <StaticQuery
      query={indexQuery}
      render={data => {
        return (
          <div className="row">
            {data.allMarkdownRemark.edges.map(({ node }) => {
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
                />
              )
            })}
          </div>
        )
      }}
    />
  </Layout>
)

export default blogList
