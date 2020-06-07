<template>
  <a class="button is-primary is-outlined has-text-primary"
      :href="url"
      target="_blank">
    AVEDA Online-Shop
  </a>
</template>

<script>
export default {
  name: 'commerce-button',
  props: {
    url: String
  }
}
</script>
