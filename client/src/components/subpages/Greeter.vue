<template>
  <div class="subpage">
    <div class="image">
      <img src=../../assets/subpages/greeter/frank.jpg>
    </div>
    <div class="text content">
      <h3>
        {{ labels.SUBPAGE_GREETER_HEADER | translate }}
      </h3>
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
  // Import own styles.
  @import "../../style/3v-forhair";
  @import "../../style/subpages";

  .subpage {
    display: flex;
    flow-direction: row;
    justify-content: center;
    align-items: center;

    $width: 30%; // Use the same width so the mirror line is in the middle.
    $space: calc(#{$icon-radius} * 1); // Leave enough space around the logo.
    $border-radius: 10px;

    .text {
      color: $color-base;
      width: $width;
      margin-left: $space;
      background: $color-invert;
      border-radius: $border-radius;
      padding: $border-radius;
    }

    .image {
      width: $width;
      margin-right: $space;

      img {
        max-width: 250px;
        margin-left: auto; // Align right
        border-radius: $border-radius;
      }
    }
  }
</style>
