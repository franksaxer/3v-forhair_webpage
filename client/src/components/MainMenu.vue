<template>
  <div id="main-menu">
    <button id="menu-button"
            class="ghost-button"
            @click="menuOpen=!menuOpen">

      <i  v-if="!menuOpen"
          class="fa fa-bars"
          area-hidden="true">
      </i>

      <i  v-if="menuOpen"
          class="fa fa-times"
          area-hidden="true">
      </i>
    </button>

    <div  id="menu-list"
          v-if="$isDesktop() || menuOpen">

      <a v-for="entry, index in entries"
         :class="['menu-entry', {'middle-entry': isMiddleEntry(index)}]"
         :key="entry.id"
         ref="entryList"
         @mouseover="hoverId = entry.id"
         @mouseleave="hoverId = null"
         @click="switchPage(entry.route)">

        <i  :class="['fa', entry.icon]"
            area-hidden="true">
        </i>

        <span class="title"
              :style="getTitleStyle(index)"
              v-if="($isMobile() && menuOpen) || entry.id === hoverId">
          {{ entry.label | translate | capitalize }}
        </span>
      </a>
    </div>
    <div  id="menu-overlay"
          v-if="$isMobile() && menuOpen"
          @click="menuOpen = false"/>
  </div>
</template>

<script>
import { DataStoreEntries, loadDataObject } from '../data/DataManager'

export default {
  name: 'main-menu',

  props: {
    space: Boolean
  },

  data() {
    return {
      entries: {}, // Have to be loaded asynchronous.
      hoverId: null,
      menuOpen: this.$isDesktop() // Default for desktop
    }
  },

  methods: {
    switchPage(routeName) {
      // Close the menu for mobile devices.
      this.menuOpen = false

      // Take the route.
      this.$router.push({ name: routeName })
    },

    isMiddleEntry(index) {
      if (!this.space) {
        return false
      }

      if (this.entries.length % 2 === 0) {
        return index === this.entries.length / 2 - 1
      } else {
        return index === (this.entries.length - 1) / 2 - 1
      }
    },

    showTitle(entry, index) {
      const titleLabel = entry.label
      const rect = this.$refs.entryList[index].getBoundingClientRect()

      if (this.$isDesktop()) {
        const offset = this.$labelStore.translate(titleLabel).length / 2 * 9.4
        this.titleStyle = { left: rect.right - rect.width / 2 - offset + 'px' }
      }

      if (this.$isMobile()) {
        const offset = rect.top + 'px'
        this.titleStyle = { top: offset }
      }
    },

    getTitleStyle(index) {
      if (this.$isDesktop()) {
        const rect = this.$refs.entryList[index].getBoundingClientRect() // The HTML boundaries of the entry.
        const title = this.$labelStore.translate(this.entries[index].label) // The title for this entry.
        const left = rect.left - title.length / 2 * 12 // Take the left border and shift it in relation to the title length.
        return 'left: ' + left + 'px;'
      }
    }
  },

  filters: {
    capitalize(value) {
      return value.toUpperCase()
    }
  },

  async created() {
    // Load the entries.
    this.entries = await loadDataObject(DataStoreEntries.mainMenu.key)

    // Delete the selected entry on close the window.
    window.onclose = () => {
      delete localStorage.menuEntryId
    }
  }
}
</script>

<style lang="scss" scoped>
// Import 3rd party styles
@import '~include-media/dist/include-media';

// Import own styles.
@import '../style/3v-forhair.scss';

@mixin main-menu(
  $size,
  $fontFactor,
  $marginTop,
  $marginLeft,
  $zoom: 1,
  $space: 0
) {
  // Calculate some values.
  $font: calc(#{$size} * #{$fontFactor});
  $zoomedSize: calc(#{$size} * #{$zoom});
  $zoomedMarginTop: calc(#{$marginTop} - ((#{$zoomedSize} - #{$size}) / 2));
  $zoomedMarginLeft: calc(#{$marginLeft} - ((#{$zoomedSize} - #{$size}) / 2));
  $zoomedFont: calc(#{$zoomedSize} * #{$fontFactor});

  // Definitions.
  #main-menu {
    #menu-button {
      position: fixed;
      z-index: $layout-element-layer;
      font-size: $size;
      margin: $marginLeft;
      top: 0;
      left: 0;
      color: $color-base !important;
      line-height: $size;

      @include media('>=desktop') {
        display: None;
      }
    }

    #menu-list {
      // Use fixed position, so it is "relative" to the header and so to the overdrawing icon.
      position: fixed;
      top: header-height();
      left: 0;
      display: flex;
      z-index: $menu-index; // To be over the overlay (mobile).

      @include media('>=desktop') {
        right: 0; // Take the full width.
        justify-content: center;
        overflow-x: auto;
      }

      @include media('<desktop') {
        flex-direction: column;
        max-height: calc(100vh - #{header-height()} - 10px);
        overflow-y: auto;
      }

      .menu-entry {
        font-size: $font;
        text-align: center;

        width: $size;
        height: $size;
        margin: $marginTop $marginLeft;

        color: #ffffffee; // Minimal less intensiv looks better.
        background-color: $color-base;

        border: solid 1px white;
        border-radius: $size;

        transition: $transition;

        &:hover {
          width: $zoomedSize;
          height: $zoomedSize;
          margin: $zoomedMarginTop $zoomedMarginLeft;

          font-size: $zoomedFont;

          &.middle-entry {
            margin-right: calc(
              #{$space} - $marginLeft - $zoomedMarginLeft
            ); // Compensate the lower margin.
          }
        }

        &.middle-entry {
          margin-right: $space; // For the header icon which overdraw the content.
        }
      }
    }

    .title {
      position: fixed;
      z-index: $menu-index;
      color: white;
      background-color: $color-base;
      font-weight: 700;
      font-size: $font;
      padding: 5px;
      border-radius: $border-radius;
      //text-shadow: decentShadow(white);

      @include media('>=desktop') {
        top: calc(
          #{header-height()} + #{$zoomedMarginTop} * 2 + #{$zoomedSize}
        );
      }

      @include media('<desktop') {
        left: calc(
          (#{$zoomedMarginLeft} * 2) + #{$zoomedSize}
        ); // Only for mobile (see component style)$.
        padding-top: calc(
          (#{$zoomedSize} - #{$font}) / 2
        ); // Make the title vertically centered to the circle.
      }
    }

    #menu-overlay {
      position: fixed;
      top: header-height();
      right: 0;
      bottom: 0;
      left: 0;
      z-index: $overlay-index;
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
}

@include media('>=desktop') {
  @include main-menu(
    $mainMenu-height,
    0.6,
    12px,
    12px,
    1.5,
    calc(#{$icon-radius} * 2)
  );
}

@include media('<desktop') {
  $height: calc(#{header-height()} / 1.5);
  $marginLeft: calc((#{header-height()} - #{$height}) / 2);
  @include main-menu($height, 0.6, 5px, $marginLeft);
}
</style>
