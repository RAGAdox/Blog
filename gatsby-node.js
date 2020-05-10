const { slugify } = require("./src/utils/utilityFunctions")
const path = require("path")
const firebase = require("firebase")
const reactFirebase = require("react-firebaseui")
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
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
/* Some error came with develop but build was working fine */

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      // Don't bundle modules that reference browser globals such as `window` and `IDBIndex` during SSR.
      // See: https://github.com/gatsbyjs/gatsby/issues/17725
      externals: getConfig().externals.concat(function(
        _context,
        request,
        callback
      ) {
        // Exclude bundling firebase* and react-firebase*
        // These are instead required at runtime.
        if (/^@?(react-)?firebase(.*)/.test(request)) {
          console.log("Excluding bundling of: " + request)
          return callback(null, "umd " + request)
        }
        callback()
      }),
    })
  }
}

/*exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  {
    actions.setWebpackConfig({
      // Don't bundle modules that reference browser globals such as `window` and `IDBIndex` during SSR.
      // See: https://github.com/gatsbyjs/gatsby/issues/17725
      externals: getConfig().externals.concat(function(
        _context,
        request,
        callback
      ) {
        // Exclude bundling firebase* and react-firebase*
        // These are instead required at runtime.
        if (/^@?(react-)?firebase(.*)/.test(request)) {
          console.log("Excluding bundling of: " + request)
          return callback(null, "umd " + request)
        }
        callback()
      }),
    })
  }
}*/
/*exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /^@?(react-)?firebase(.*)/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}*/
