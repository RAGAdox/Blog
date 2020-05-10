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

const bloglist = props => {
  console.log(props.location.search)
  let match
  let p1 = /\+/g
  let searchPattern = /([^&=]+)=?([^&]*)/g
  const decode = function(s) {
    return decodeURIComponent(s.replace(p1, " "))
  }
  let query = props.location.search.substring(1)
  console.log(query)
  let urlParams = {}
  while ((match = searchPattern.exec(query)))
    if (urlParams[decode(match[1])] == null)
      urlParams[decode(match[1])] = [decode(match[2])]
    else urlParams[decode(match[1])].push(decode(match[2]))
  console.log(urlParams)

  return (
    <Layout>
      <SEO title="Page two" />
      <StaticQuery
        query={indexQuery}
        render={data => {
          return (
            <div className="row">
              {data.allMarkdownRemark.edges.map(({ node }) => {
                if (
                  urlParams["tag"] == null ||
                  node.frontmatter.tags.some(tag =>
                    urlParams["tag"].includes(tag.toLowerCase())
                  )
                )
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
                else return <></>
              })}
            </div>
          )
        }}
      />
    </Layout>
  )
}

export default bloglist
