// import store modules
import * as users from './users'

const storeModules = {
  users,
}

// module 및 initialStates 분리하여 export
const modules = {}, initialStates = {}
Object.entries(storeModules).forEach(([k, v]) => {
  modules[k] = v.default
  initialStates[k] = v.initialState
})
export { modules, initialStates }
