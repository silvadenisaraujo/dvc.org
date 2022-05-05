const path = require('path')
const { createContentDigest } = require(`gatsby-core-utils`)

async function onCreateNode({ node, actions }) {
  const { createNode } = actions

  // SanityBlog Nodes
  if (node.internal.type === `SanityBlog`) {
    // Add text/markdown node children to SanityBlog node
    const textNode = {
      id: `${node.id}-MarkdownBody`,
      parent: null,
      dir: path.resolve('./'),
      internal: {
        type: `${node.internal.type}MarkdownBody`,
        mediaType: 'text/markdown',
        content: node.body,
        contentDigest: createContentDigest(node.body)
      }
    }
    createNode(textNode)
  }
}

module.exports = onCreateNode
