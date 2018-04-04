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
          v-if="menuOpen">

      <a v-for="entry, index in entries"
         :class="['menu-entry', {'middle-entry': isMiddleEntry(index)}]"
         :style="{'order': entry.priority}"
         ref="entryList"
         @mouseover="showTitle(entry, index)"
         @mouseleave="hideTitle">

      <i  :class="['fa', entry.icon]"
          area-hidden="true">
      </i>
      </a>
    </div>

    <span id="title"
          :style="titleStyle">

      {{ titleLabel | translate | capitalize }}
    </span>
  </div>
</template>

<script>
  import {DataStoreEntries, loadDataObject} from '../data/DataManager'

  export default {
    name: 'main-menu',

    data () {
      return {
        entries: {}, // Have to be loaded asynchronous.
        titleLabel: '',
        titleStyle: {},
        titleFontSize: '16',
        menuOpen: true // Default for desktop
      }
    },

    methods: {
      isMiddleEntry (index) {
        return index === this.entries.length / 2 - 1
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
      }
    },

    async created () {
      // Hide the menu per default for mobile version.
      if (this.$isMobile()) {
        this.menuOpen = false
      }

      // Load the entries.
      this.entries = await loadDataObject(DataStoreEntries.mainMenu.key)
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
