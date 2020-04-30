import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { element } from "prop-types"
const Image = props => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { ext: { regex: "/jpeg|jpg|png/" } }) {
        edges {
          node {
            childImageSharp {
              thumbnail: fluid(maxWidth: 600, maxHeight: 600) {
                ...GatsbyImageSharpFluid
              }
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid
              }
            }
            relativePath
          }
        }
      }
    }
  `)
  if (props.name) {
    const style = {
      colValue: props.col ? props.col : 12,
      float: props.float ? props.float : "none",
      display: props.display ? props.display : "block",
      propClass: props.className ? props.className : "",
    }
    let fluidData = null
    const dataEdges = data.allFile.edges
    for (var i = 0; i < dataEdges.length; i++) {
      if (dataEdges[i].node.relativePath === props.name) {
        if (props.thumbnail)
          fluidData = dataEdges[i].node.childImageSharp.thumbnail
        else fluidData = dataEdges[i].node.childImageSharp.fluid
        break
      }
    }
    if (fluidData != null) {
      return <Img fluid={fluidData} className="card-img-top" />
    } else return <p>Image Not Found</p>
  } else {
    return <></>
  }
}

export default Image
