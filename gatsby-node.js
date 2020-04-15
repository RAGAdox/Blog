const { slugify } = require("./src/utils/utilityFunctions")
const path = require("path")
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    console.log(`Node:${JSON.stringify(node, null, 2)}`)
    createNodeField({
      node,
      name: "slug",
      value: slugify(node.frontmatter.title),
    })
  }
}
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const SinglePost = path.resolve("src/templates/post.js")
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              author
              tags
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) return Promise.reject(res.errors)
    const posts = res.data.allMarkdownRemark.edges
    posts.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: SinglePost,
        context: {
          slug: node.fields.slug,
        },
      })
    })
  })
}
