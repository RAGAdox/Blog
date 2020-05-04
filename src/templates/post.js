import React from "react"
import rehypeReact from "rehype-react"
import Img from "gatsby-image"
import Layout from "../components/layout"
import Helmet from "react-helmet"
import SEO from "../components/seo"
import Quote from "../components/markdownComponents/quote"
import Image from "../components/markdownComponents/image"
import { graphql } from "gatsby"

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { quote: Quote, pic: Image },
}).Compiler
function webShare(post) {
  const url = window.document.location.href
  const shareObject = {
    title: post.title,
    text: "Check out this post ",
    url: window.document.location.href,
  }
  if (navigator.share) {
    navigator
      .share(shareObject)
      .then(() => console.log("Successful share"))
      .catch(error => console.log("Error sharing", error))
  } else {
    console.log("in loptop ", shareObject)
  }
}
const SinglePost = ({ data }) => {
  const post = data.markdownRemark.frontmatter
  console.log("data from post query ", data)

  return (
    <Layout>
      <SEO title={post.title}></SEO>
      {/* <h1>{post.title}</h1> */}

      <div className="row ">
        {/* <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} /> */}
        <div className="card card-post col-sm-12">
          {/* <Img fluid={post.image.childImageSharp.fluid} /> */}
          <div className="card-top">
            <h1 className="card-title">{post.title}</h1>
            <Image name={post.thumbnailImage} />
          </div>
          {renderAst(data.markdownRemark.htmlAst)}
        </div>
        <div class="">
          <img
            className="d-inline"
            src="https://img.icons8.com/android/24/000000/share.png"
            onClick={post => webShare(post)}
          />
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
        thumbnailImage
      }
    }
  }
`
export default SinglePost
