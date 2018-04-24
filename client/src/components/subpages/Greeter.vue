<template>
  <div class="subpage">
    <vue-particles class="particles" color="#dedede" :linesDistance="300" :particlesNumber="40"/>

    <div class="image">
      <img src="../../assets/subpages/greeter/frank.jpg">
    </div>

    <div class="content-box">
      <h4 @click="editText(data, 'header')" v-editable>
        {{ data.header }}
      </h4>

      <p @click="editText(data, 'content')" v-editable>{{ data.content }}</p>
    </div>
  </div>
</template>

<script>
  import Subpage from '../../plugins/SubpageMixin'
  import { DataStoreEntries } from '../../data/DataManager'

  export default {
    name: 'subpage-greeter',

    mixins: [Subpage],

    data () {
      return {
        dataKey: DataStoreEntries.greeter.key
      }
    }
  }
</script>

<style lang="scss" scoped>
  // 3rd party styles.
  @import '../../../node_modules/include-media/dist/include-media';

  // Import own styles.
  @import "../../style/3v-forhair";
  @import "../../style/subpages";

  .subpage {

    .particles{
      position: absolute;
      top: 0;
      left:0;
      height: 100%;
      width: 100%;
    }


    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 0!important; // Makes calculations easier.
    max-height: 100%; // Have a cover page.
    overlow: hidden;

    // Arrange text and image next to the logo.
    @include media('>=desktop') {
      flow-direction: row;
      justify-content: center;
    }

    // Arrange text and image above and under the logo.
    @include media('<desktop') {
      flex-direction: column;
    }

    $width: 40%; // Use the same width so the mirror line is in the middle.
    $narrowHeight: calc((100vh - #{$header-height} - #{$footer-height}) * 0.7);
    $space-desktop: $icon-radius; // Leave enough space around the logo.
    $space-mobile: calc(#{$icon-radius} * 0.66);
    $border-radius: 10px;
    $segmentHeight: calc((100vh / 2)  - #{$header-height});

    .image {
      @include media('>=desktop') {
        width: $width;
        margin-right: $space-desktop;
      }

      @include media('<desktop') {
        margin-bottom: $space-mobile;
      }

      img {
        @include media('>=desktop') {
          max-width: 250px;
          margin-left: auto; // Align right
        }

        // For versions where the image is to height. (desktop window on half top).
        @media all and (max-height: 600px) {
          height: $narrowHeight;
          width: auto!important;
        }

        @include media('<desktop') {
          $height: calc((#{$segmentHeight} - #{$icon-radius}) * 0.9);
          max-height: $height;
          margin-top: calc(#{$segmentHeight} - #{$height} - #{$space-mobile})
        }
      }
    }

    .content-box {
      overflow-x: auto;
      margin: 0; // Overwrite .content-box defaults.

      @include media('>=desktop') {
        margin-left: $space-desktop;
        width: $width;
        max-height: 60vh; // Get along with half screen browsing.
      }

      // For versions where the image is to height. (desktop window on half top).
      @media all and (max-height: 600px) {
        height: $narrowHeight;
      }

      @include media('<desktop') {
        margin-top: $space-mobile;
        max-height: calc(#{$segmentHeight} - #{$space-mobile} + 30px);
      }

      h4 {
        font-weight: bold;
      }
    }

  }
</style>
