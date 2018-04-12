<template>
  <div class="subpage">
    <div class="image" v-switch-left-effect>
      <img src=../../assets/subpages/greeter/frank.jpg>
    </div>
    <div class="text content-box" v-switch-left-effect>
      <h4>
        {{ labels.SUBPAGE_GREETER_HEADER | translate }}
      </h4>
      <p>
        {{ labels.SUBPAGE_GREETER_CONTENT | translate }}
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'subpage-greeter'
  }
</script>

<style lang="scss">
  // 3rd party styles.
  @import '../../../node_modules/include-media/dist/include-media';

  // Import own styles.
  @import "../../style/3v-forhair";
  @import "../../style/subpages";

  .subpage {
    display: flex;
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

    $width: 30%; // Use the same width so the mirror line is in the middle.
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

        @include media('<desktop') {
          $height: calc((#{$segmentHeight} - #{$icon-radius}) * 0.9);
          max-height: $height;
          margin-top: calc(#{$segmentHeight} - #{$height} - #{$space-mobile})
        }
      }
    }

    .text {
      color: $color-base;
      background: $color-invert;
      border-radius: $border-radius;
      padding: $border-radius;
      overflow-x: auto;

      @include media('>=desktop') {
        margin-left: $space-desktop;
        width: $width;
        max-height: 70vh; // Get along with half screen browsing.
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
