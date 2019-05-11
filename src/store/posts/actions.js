import axios from 'axios'

export default {
  async get_list ({ commit }) {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const { data } = await axios.get(url);
    commit('SET_LIST', data);
  }
}
