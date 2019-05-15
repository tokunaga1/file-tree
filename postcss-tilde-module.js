const postcss = require('postcss')

module.exports = postcss.plugin('tilde-module', opts => {
  return (root, result) => {
    root.nodes.forEach(node => {
      if (node.name == 'import') {
        const params = node.params.replace(/["']/g, '');
        const char0 = params[0];

        if (char0 != '~') {
          node.params = `"~${params}"`;
        }
      }
    })

    return root;
  }
})
