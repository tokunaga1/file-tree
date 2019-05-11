import _ from 'lodash'

export default {
  nodes (state) {
    return state.list.map(item => {
      const isLeaf = _.has(item, 'isLeaf')? item.isLeaf: true;

      return {
        id: item.id,
        title: item.title || item.name,
        isLeaf,
      }
    })
  },
  json (state, getters) {
    return JSON.stringify(getters.nodes);
  }
}
