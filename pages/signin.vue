<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <h1>Signin</h1>
      <p v-for="(item, index) in SOCIAL_SIGNIN_ITEMS" :key="index">
        <a href="#" @click.prevent="onClickSocialSignIn(item.target)">
          <img
            :src="`/images/img-social-${item.target}.png`"
            :alt="`${item.label}`"
            width="32"
            height="32"
            align="absmiddle"
            style="margin-right:8px"
          />
          {{ item.label }}
        </a>
      </p>
    </v-flex>
  </v-layout>
</template>

<script>
import Configure from '~/constants/Configure'
import SocialSignIn from '~/constants/SocialSignIn'

export default {
  computed: {
    SOCIAL_SIGNIN_ITEMS () {
      return SocialSignIn
    },
  },
  methods: {
    onClickSocialSignIn (target) {
      window.open(
        `${Configure.servers.API}/auth/${target}?redirectUrl=/`,
        `__auth_signin_${target}__`,
        'width=640px, height=640px',
      );
    },
  },
}
</script>
