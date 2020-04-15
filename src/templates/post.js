import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby';
export default function Template({data,}) {
    const { markdownRemark: blogs } = data;
    return (
        <div>
            <h1>{blogs.frontmatter.title}</h1>

        </div>
    )
}
export const blogQuery = graphql`
    query BlogPostByPath($path:String!){
        markdownRemark(frontmatter:{path:{eq:$path}}){
            html
            frontmatter{
                path
                title
            }
        }
    }
`