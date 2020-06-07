<template>
  <section class="banner has-background-light">
    <div class="container"><slot></slot></div>
  </section>
</template>

<script>
export default {
  name: 'banner'
}
</script>

<style lang="scss">
.banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: 25px;
}
</style>
