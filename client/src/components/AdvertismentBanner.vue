<template>
  <div  id="advertisement"
        :class="{'closed': closed}"
        :style="{'background-image': 'url(' + imageSource +')'}">

    <button class="ghost-button"
            @click="closed = true">

      <i class="fa fa-times-circle"
         aria-hidden="true">
      </i>
    </button>
  </div>
</template>


<script>
  import generalConfig from '../data/GeneralConfig'

  export default {
    name: 'advertisement-banner',

    data: function () {
      return {
        closed: false,
        imageSource: generalConfig.advertisementImage
      }
    }
  }
</script>


<style lang="scss" scoped>
  // Import 3rd party styles
  @import '../../node_modules/include-media/dist/include-media';
  @import '../../node_modules/font-awesome/css/font-awesome.css';

  // Import own styles
  @import '../style/3v-forhair';


  // Define some variables.
  $banner-height: 300px;


  #advertisement {
    /* Shapes */
    left: calc(100% - #{$advertisement-width});
    right: 0;
    // Inherit the top and bottom properties from the upper component.


    /* Background */
    background-position: center center;
    background-repeat:  no-repeat;
    background-size: cover;


    /* Mobile Properties */
    @include media('<desktop') {
      /* Shapes */
      left: 0;
      top: calc(100vh - #{$banner-height});
      right: 0;
      bottom: 0;

      &.closed {
        display: none;
      }
    }


    /* Close Button */
    button {
      /* Variables */
      $margin: 5px;


      /* Position and Shape */
      position: absolute;
      top: $margin;
      right: $margin;


      /* Effects */
      &:hover {
        color: gray;
      }


      @include media('>=desktop') {
        // Should be only removable on mobile devices.
        display: none;
      }
    }

  }
</style>
