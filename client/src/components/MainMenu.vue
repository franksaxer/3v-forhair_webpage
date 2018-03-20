<template>
  <div id="main-menu">
    <a v-for="entry in entries"
       :class="['menu-entry', {'middle-entry': isMiddleEntry(entry.id)}]"
       @click="hover">

      {{ entry.label | translate | firstChar }}
    </a>
  </div>
</template>

<script>
  export default {
    name: 'main-menu',

    data () {
      return {
        hoverId: 1,
        activeLeftPos: '100px',
        activeTopPos: '100px'
      }
    },

    computed: {
      entries: function () {
        return [
          {
            id: 1,
            label: this.labels.MENU_ENTRY_WELCOME
          },
          {
            id: 2,
            label: this.labels.MENU_ENTRY_RECENSION
          },
          {
            id: 3,
            label: this.labels.MENU_ENTRY_INFOS
          },
          {
            id: 4,
            label: this.labels.MENU_ENTRY_ABOUT_US
          },
          {
            id: 5,
            label: this.labels.MENU_ENTRY_STAFF
          },
          {
            id: 6,
            label: this.labels.MENU_ENTRY_PRICE_HER
          },
          {
            id: 7,
            label: this.labels.MENU_ENTRY_PRICE_HIM
          },
          {
            id: 8,
            label: this.labels.MENU_ENTRY_PRODUCTS_HIM
          },
          {
            id: 9,
            label: this.labels.MENU_ENTRY_COLORS
          },
          {
            id: 10,
            label: this.labels.MENU_ENTRY_PRICE_COLORS
          },
          {
            id: 11,
            label: this.labels.MENU_ENTRY_PRODUCTS
          },
          {
            id: 12,
            label: this.labels.MENU_ENTRY_PROMOTION
          },
          {
            id: 13,
            label: this.labels.MENU_ENTRY_CONTACT
          },
          {
            id: 14,
            label: this.labels.MENU_ENTRY_APPROACH
          },
          {
            id: 15,
            label: this.labels.MENU_ENTRY_IMPRESSIONS
          },
          {
            id: 16,
            label: this.labels.MENU_ENTRY_IMPRESSUM
          }
        ]
      }
    },

    methods: {
      isMiddleEntry (id) {
        const middleId = this.entries[this.entries.length / 2].id - 1
        return id === middleId
      },

      hover (event) {
        console.log(JSON.strinify(event))
        return null
      }
    },

    filters: {
      capitalize (value) {
        return value.toUpperCase()
      },

      firstChar (value) {
        return value[0]
      }
    }
  }
</script>

<style lang="scss" scoped>
  // Import own styles
  @import '../style/3v-forhair';

  #main-menu {
    // Use fixed position, so it is "relative" to the header and so to the overdrawing icon.
    position: fixed;
    top: $header-height;
    left: 0;
    right: 0;

    display: flex;
    justify-content: center;
    padding-top: 5px;

    .menu-entry {
      $size: 35px;
      $margin: 12px; // Must high enought to compensate the zoom level.
      $fontFactor: 0.65;
      $middleSpace: calc(#{$icon-radius} * 2);

      font-size: calc(#{$size} * #{$fontFactor});
      text-align: center;

      width: $size;
      height: $size;
      margin: $margin;

      color: white;
      background-color: $color-base;

      border: solid 1px white;
      border-radius: $size;

      &:hover {
        $zoom: 1.5;
        $sizeZoomed: calc(#{$size} * #{$zoom});
        $marginZoomed: calc(#{$margin} - ((#{$sizeZoomed} - #{$size}) / 2));
        $fontZoomed: calc(#{$sizeZoomed} * #{$fontFactor});

        width: $sizeZoomed;
        height: $sizeZoomed;
        margin: $marginZoomed;

        font-size: $fontZoomed;

        &.middle-entry {
          margin-right: calc(#{$middleSpace} - (#{$margin} - #{$marginZoomed})); // Compensate the lower margin.
        }
      }

      &.middle-entry {
        margin-right: $middleSpace; // For the header icon which overdraw the content.
      }
    }
  }
</style>
