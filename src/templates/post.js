import React from "react"
import rehypeReact from "rehype-react"
import Img from "gatsby-image"
import Layout from "../components/layout"
import Helmet from "react-helmet"
import SEO from "../components/seo"
import Quote from "../components/markdownComponents/quote"

import { graphql } from "gatsby"

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { quote: Quote },
}).Compiler
function webShare() {
  const url = window.document.location.href
  if (navigator.share) {
    navigator
      .share({
        title: "web.dev",
        text: "Check out web.dev.",
        url: "https://web.dev/",
      })
      .then(() => console.log("Successful share"))
      .catch(error => console.log("Error sharing", error))
  } else {
    console.log("in loptop ")
  }
}
const SinglePost = ({ data }) => {
  const post = data.markdownRemark.frontmatter
  return (
    <Layout>
      <SEO title={post.title}></SEO>
      <h1>{post.title}</h1>

      <div className="row ">
        {/* <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} /> */}
        <div className="card card-post col-sm-12">
          <Img fluid={post.image.childImageSharp.fluid} />
          {renderAst(data.markdownRemark.htmlAst)}
          <div class="card-text">
            {navigator.share ? "Enabled" : "disabled"}
            <img
              src="https://img.icons8.com/android/24/000000/share.png"
              onClick={webShare}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}
export const postQuery = graphql`
  query blogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      htmlAst
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
