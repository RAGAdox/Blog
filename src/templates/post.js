import React from "react"
import Layout from "../components/layout"
import Helmet from "react-helmet"
import SEO from "../components/seo"
import Img from "gatsby-image"
import { graphql } from "gatsby"
const SinglePost = ({ data }) => {
  const post = data.markdownRemark.frontmatter
  return (
    <Layout>
      <SEO title={post.title}></SEO>
      <h1>{post.title}</h1>
      <Img fluid={post.image.childImageSharp.fluid} />
      <div className="row ">
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </div>
    </Layout>
  )
}
export const postQuery = graphql`
  query blogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        title
        author
        date
        tags
        image {
          childImageSharp {
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
export default SinglePost
