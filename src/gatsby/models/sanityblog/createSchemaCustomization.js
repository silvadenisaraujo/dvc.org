async function createSchemaCustomization(api) {
  const {
    actions: { createTypes },
    schema: { buildObjectType }
  } = api
  const typeDefs = [
    buildObjectType({
      name: 'SanityBlog',
      interfaces: ['Node'],
      fields: {
        bodyMarkdown: {
          type: 'SanityBlogMarkdownBody',
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          resolve: (source, args, context, info) => {
            return context.nodeModel.getNodeById({
              id: `${source.id}-MarkdownBody`,
              type: 'SanityBlogMarkdownBody'
            })
          }
        }
      }
    })
  ]
  createTypes(typeDefs)
}

module.exports = createSchemaCustomization
