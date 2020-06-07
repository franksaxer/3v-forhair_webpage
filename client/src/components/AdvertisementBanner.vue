<template>
  <banner>
    <div class="columns has-text-centered">
      <div class="column is-5 is-offset-1">
        <p class="title is-4 has-light-text">
          The Art and Science of<br>Flower and Plan Essences
        </p>
        <a class="button is-primary is-outlined has-text-primary"
           href="https://www.aveda.de/locator/get_the_facts.tmpl?SalonID=6480"
           target="_blank">
          Zum Online-Shop
        </a>
      </div>
      <div class="column is-5 is-size-6 has-text-weight-medium has-margin-auto hide-on-mobile">
        <p>3v-forhair ist <a href="https://www.aveda.de/salon/3v-forhair" target="_blank">offizieller Partner</a> von <i>AVEDA</I>. Kosmetikprodulkte mit natürlichen Minerailien aus einer verantwortungsvoller Produktion.</p>
      </div>
    </div>
  </banner>
</template>

<script>
import Banner from './Banner.vue'

export default {
  name: 'advertisement-banner',
  components: { Banner }
}
</script>

<style lang="scss">
@import '~include-media/dist/include-media';

.has-margin-auto {
  margin: auto;
}

.hide-on-mobile {
  @include media('<desktop') {
    display: none;
  }
}
</style>
