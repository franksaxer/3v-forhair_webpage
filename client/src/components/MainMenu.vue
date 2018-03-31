<template>
  <div id="main-menu">
    <button id="menu-button"
            class="ghost-button is-primary"
            @click="menuOpen=!menuOpen">

      <i  class="fa fa-bars"
          area-hidden="true">
      </i>
    </button>

    <div  id="menu-list"
          v-if="menuOpen">

      <a v-for="entry, index in entries"
         :class="['menu-entry', {'middle-entry': isMiddleEntry(entry.id)}]"
         ref="entryList"
         @mouseover="showTitle(entry, index)"
         @mouseleave="hideTitle">

        {{ entry.label | translate | firstChar }}
      </a>
    </div>

    <span id="title"
          :style="titleStyle">

      {{ titleLabel | translate | capitalize }}
    </span>
  </div>
</template>

<script>
  export default {
    name: 'main-menu',

    data () {
      return {
        titleLabel: '',
        titleStyle: {},
        titleFontSize: '16',
        menuOpen: true // Default for desktop
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

      showTitle (entry, index) {
        this.titleLabel = entry.label
        const rect = this.$refs.entryList[index].getBoundingClientRect()

        if (this.$isDesktop()) {
          const fontSizeToWidthRelation = 1.7
          const offset = (this.$labelStore.translate(this.titleLabel).length / 2) * (this.titleFontSize / fontSizeToWidthRelation)
          this.titleStyle = {left: rect.right - (rect.width / 2) - offset + 'px'}
        }

        if (this.$isMobile()) {
          const offset = rect.top + 'px'
          this.titleStyle = {top: offset}
        }
      },

      hideTitle () {
        this.titleLabel = ''
      }
    },

    filters: {
      capitalize (value) {
        return value.toUpperCase()
      },

      firstChar (value) {
        return value[0]
      }
    },

    created () {
      // Hide the menu per default for mobile version.
      if (this.$isMobile()) {
        this.menuOpen = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  // Import 3rd party styles
  @import '../../node_modules/include-media/dist/include-media';

  /*
    Cause both device types should change variables used for the style, this has be exported.
    The problem is, that it is not possible to define variable in a media block and use them outside.
    By this it would lead to an inconsistent environment and changes are not possible easily.
    For each device type, first the variables are loaded and afterwards the same style, which use this variables.
   */

  @media all and (min-width: map-get($breakpoints, 'desktop')) {
    @import '../style/MainMenu/MainMenuVariablesDesktop';
    @import '../style/MainMenu/MainMenuStyle';
  }

  @media all and (max-width: map-get($breakpoints, 'desktop')) {
    @import '../style/MainMenu/MainMenuVariablesMobile';
    @import '../style/MainMenu/MainMenuStyle';
  }



</style>
