const fs = require('fs-extra')
const path = require('path')

exports.sourceNodes = async function sourceNodes({ actions, createNodeId, createContentDigest }) {
  const nodes = await fs.readFile(path.join(__dirname, 'sample-data.json'), 'utf8')
    .then(res => JSON.parse(res))

  nodes.forEach(node => {
    actions.createNode(Object.assign({}, node, {
      id: createNodeId(`example-data-node-${node.key}`),
      internal: {
        type: `ExampleNode`,
        contentDigest: createContentDigest(node)
      }
    }))
  })
}