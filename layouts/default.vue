<template>
  <v-app>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :to="item.to"
          :key="i"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"/>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-side-icon @click="drawer = !drawer"/>
      <!--<v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"/>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn>-->
      <v-toolbar-title v-text="title"/>
    </v-toolbar>

    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import Configure from '~/constants/Configure'
import { getWebToken, saveWebToken, removeWebToken, parseWebToken } from '~/utils/AccessToken'

export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        { icon: 'apps', title: 'Welcome', to: '/' },
        { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' },
      ],
      miniVariant: false,
      title: 'Vuetify.js',
    }
  },
  methods: {
    messageListener (event) {
      if (event.origin !== Configure.servers.local) {
        if (event.origin === Configure.servers.serviceSSL) {
          const { data } = event
          if (data.isSuccess) {
            saveWebToken(data.payload) // 로컬스토리지에 저장
          } else {
            removeWebToken()
            //ToastMessage.danger(data.payload);
          }
        } else {
          // 우리 서버측 요청이 아니면 그냥 무시해도 됨
          //console.error(event.origin, Configure.servers.API_ORIGIN);
          //ToastMessage.danger('Disallowed access for signin process');
        }
      }
    },
    storageListener (event) {
      switch (event.detail.key) {
        case 'accessToken':
          if (event.detail.action === 'set') {
            this.SET_SIGNIN(parseWebToken(event.detail.value)) // 실제 사용자 정보 얻어와서 스토어에 저장
          } else {
            // event.detail.action === 'remove' || 'clear'
            this.SET_SIGNOUT()
          }
          break
        default:
          break
      }
    },
    ...mapActions({
      SET_SIGNIN: 'setSignIn',
      SET_SIGNOUT: 'setSignOut',
      SET_USER_ROLES: 'setUserRoles',
      MAINTAIN_AUTH: 'maintainAuth',
    }),
  },
  mounted () {
    // 로그인 유지
    this.MAINTAIN_AUTH(parseWebToken(getWebToken()))
    // User Roles 데이터 얻어오기
    this.SET_USER_ROLES()
    // 로그인을 위한 리스너 추가
    window.addEventListener('message', this.messageListener, false)
    // 스토리지에 저장된 JWT토큰 변경 리스너 추가
    window.addEventListener('localStorage', this.storageListener, false)
  },
  beforeDestroy () {
    // 로그인을 위한 리스너 제거
    window.removeEventListener('message', this.messageListener)
    // 스토리지에 저장된 JWT토큰 변경 리스너 제거
    window.removeEventListener('localStorage', this.storageListener)
  },
}
</script>
