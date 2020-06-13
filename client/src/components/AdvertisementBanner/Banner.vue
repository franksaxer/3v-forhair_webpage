<template>
  <transition name="slide-fade">
    <section class="banner has-background-light">
      <div class="container">
        <div class="columns has-text-centered">
          <div class="column banner_column is-5 is-offset-1">
            <slot name="leftColumn" />
          </div>
          <div class="column is-5 banner_column banner_column--hide-on-mobile">
            <slot name="rightColumn" />
          </div>
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
export default {
  name: 'banner'
}
</script>

<style lang="scss">
@import '~include-media/dist/include-media';

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding-top: 15px;
  padding-bottom: 25px;
}

.banner_column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.banner_column--hide-on-mobile {
  @include media('<desktop') {
    display: none;
  }
}
</style>
