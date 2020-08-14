<template>
  <banner v-if="showBanner">
    <template #leftColumn>
      <p class="title is-4 has-light-text">
        The Art and Science of<br>Flower and Plant Essences
      </p>
      <commerce-button v-on:click.native="hideBanner"/>
    </template>
    <template #rightColumn>
      <message class="margin-auto" />
    </template>
  </banner>
</template>

<script>
import Banner from './Banner.vue'
import CommerceButton from './CommerceButton.vue'
import Message from './Message.vue'

const LOCAL_STORAGE_KEY = 'showAdvertisementBanner'
const DELAY_OF_ADVERTISMENT_BANNER = 2000

export default {
  name: 'advertisement-banner',

  components: { Banner, CommerceButton, Message },
  data: function() {
    return {
      showBanner: false
    }
  },
  created: function() {
    const showBannerCache = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (showBannerCache !== null) {
      this.showBanner = JSON.parse(showBannerCache) // localStroage can't save pure Boolean
    }
    if (this.showBanner || showBannerCache == null) {
      // eslint-disable-next-line no-return-assign
      setTimeout(() => this.showBanner = true, DELAY_OF_ADVERTISMENT_BANNER)
    }
  },
  methods: {
    hideBanner() {
      this.showBanner = false
      localStorage.setItem(LOCAL_STORAGE_KEY, false)
    }
  }
}
</script>
