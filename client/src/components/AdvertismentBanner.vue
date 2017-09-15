<template>
  <div id="advertisement"></div>
</template>


<script>
  export default {
    name: 'advertisement-banner'
  }
</script>


<style lang="scss" scoped>
  // Import 3rd party styles
  @import '../../node_modules/include-media/dist/include-media';
  @import '../../node_modules/font-awesome/css/font-awesome.css';

  // Import own styles
  @import '../style/3v-forhair';


  #advertisement {
    left: calc(100% - #{$advertisement-width});
    right: 0;

    background: url('../assets/advertisement/aveda-example.png');
    background-position: center left;
    background-repeat:  no-repeat;
    background-size: cover;

    @include media('<desktop') {
      // Hide the advertisement on mobile devices to safe space.
      display: none;
    }
  }
</style>
