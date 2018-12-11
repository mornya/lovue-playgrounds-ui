import produce from 'immer'

// Store 초기화를 위한 initialState 선언
export const initialState = () => ({
  users: [],
})

export default {
  state: initialState(),
  actions: {
    async getUsers ({ commit }) {
      const result = await this.$axios.$get('/users')
      commit('setUsers', result)
      return result
    },
    async updateUser ({ commit }, { userId, provider, group, role }) {
      const result = await this.$axios.$post(`/user/${userId}/${provider}`, { group, role })
      if (result && result.data.isSuccess) {
        commit('updateUser', { userId, provider, group, role })
        return true
      }
      return false
    },
    async deleteUser ({ commit }, { userId, provider }) {
      const result = await this.$axios.$delete(`/user/${userId}/${provider}`)
      if (result && result.data.isSuccess) {
        commit('deleteUser', { userId, provider })
      }
    },
  },
  mutations: {
    setUsers (state, payload) {
      state.users = payload || initialState().users
    },
    updateUser (state, payload) {
      state.users = produce(state.users, draft => {
        const index = draft.findIndex(item => item.userId === payload.userId && item.provider === payload.provider)
        draft[index].group = payload.group
        draft[index].role = payload.role
      })
    },
    deleteUser (state, payload) {
      state.users = produce(state.users, draft => {
        const index = draft.findIndex((item) => item.userId === payload.userId && item.provider === payload.provider)
        draft.splice(index, 1)
      })
    },
  },
}
