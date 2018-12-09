import { Store } from 'vuex'
import { modules, initialStates } from './modules'

const initialState = () => ({
})

export default () => new Store({
  state: initialState(),
  actions: {},
  mutations: {
    clearModuleStates (state) {
      Object.entries(initialStates).forEach(([k, v]) => state[k] = v())
    },
  },
  modules,
})
