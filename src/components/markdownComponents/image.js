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
    }
    let fluidData = null
    data.allFile.edges.forEach(element => {
      if (element.node.relativePath === props.name) {
        console.log("The image", element.node.childImageSharp.fluid)
        fluidData = element.node.childImageSharp.fluid
      }
    })
    if (fluidData != null) {
      return (
        <Img
          fluid={fluidData}
          className={`col-sm-${style.colValue} d-${style.display} float-${style.float} image`}
        />
      )
    } else return <p>Image Not Found</p>
  } else {
    return <></>
  }
}

export default Image
