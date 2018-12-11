import { Store } from 'vuex'
import { modules, initialStates } from './modules'

const initialState = () => ({
  currentUser: {
    userId: null,
    provider: null,
    group: null,
    role: null,
    userName: null,
    photoUrl: null,
    email: null,
    createdAt: 0,
    updatedAt: 0,
    privileges: {
      isNone: false,
      isReadable: false,
      isWritable: false,
      isManager: false,
      isAdmin: false,
    },
  },
  userRoles: [],
})

export default () => new Store({
  state: initialState(),
  actions: {
    async setSignIn ({ commit }, parsedToken) {
      const userId = parsedToken.uid
      const provider = parsedToken.pro
      const result = await this.$axios.$get(`/user/${userId}/${provider}`)
      commit('setSignIn', {
        userId,
        provider,
        ...result.payload.user,
        privileges: result.payload.privileges,
      })
    },
    async setSignOut ({ commit, rootState }) {
      const userId = rootState.currentUser.userId
      const provider = rootState.currentUser.provider
      await this.$axios.$post(`/auth/signout`, { userId, provider })
      commit('setSignOut')
    },
    async setUserRoles ({ commit }) {
      const result = await this.$axios.$get('/userRoles')
      commit('setUserRoles', result.payload)
    },
    maintainAuth ({ dispatch }, parsedToken) {
      if (parsedToken) {
        // 웹토큰의 만료일 체크
        const exp = Number(parsedToken.exp) * 1000
        const cur = Date.now()
        if (cur <= exp) {
          const restTime = Math.round((exp - cur) / 3600000)
          if (restTime <= 24) {
            console.warn(`\n📣 로그인 토근 만료 ${restTime} 시간 전\n\n`)
          }

          // 만료일시 이전일 경우 로그인 상태 저장
          dispatch('setSignIn', parsedToken)
        }
      }

      dispatch('setSignOut')

      return Promise.resolve(null)
    },
  },
  mutations: {
    setSignIn (state, payload) {
      state.currentUser = payload || initialState().currentUser
    },
    setSignOut (state) {
      state.currentUser = initialState().currentUser
    },
    setUserRoles (state, payload) {
      state.userRoles = payload.roles || initialState().userRoles
    },
    clearModuleStates (state) {
      Object.entries(initialStates).forEach(([k, v]) => state[k] = v())
    },
  },
  getters: {
    isAuthorized (state) {
      return (role) => {
        const userRole = state.currentUser.role
        if (role && userRole) {
          const roleIndex = state.userRoles.findIndex(item => item === role)
          const userRoleIndex = state.userRoles.findIndex(item => item === userRole)
          return roleIndex !== -1 && userRoleIndex !== -1 && roleIndex <= userRoleIndex
        }
        return true
      }
    },
  },
  modules,
})
