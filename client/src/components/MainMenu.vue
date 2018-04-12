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
         @click="switchPage(entry)"
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

    model: {
      prop: 'entry', // Rename from default 'value' property.
      event: 'switch' // Rename from default 'input' event.
    },

    props: {
      space: Boolean
    },

    data () {
      return {
        entries: {}, // Have to be loaded asynchronous.
        titleLabel: '',
        titleStyle: {},
        titleFontSize: '16',
        menuOpen: this.$isDesktop() // Default for desktop
      }
    },

    methods: {
      isMiddleEntry (index) {
        if (!this.space) {
          return false
        }

        if (this.entries.length % 2 === 0) {
          return index === this.entries.length / 2 - 1
        } else {
          return index === (this.entries.length - 1) / 2 - 1
        }
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
      },

      switchPage (entry) {
        // Update parent component.
        this.$emit('switch', entry)

        // Store selection to local storage.
        localStorage.menuEntryId = entry.id
      }
    },

    filters: {
      capitalize (value) {
        return value.toUpperCase()
      }
    },

    async created () {
      // Load the entries.
      this.entries = await loadDataObject(DataStoreEntries.mainMenu.key)

      // Retrieve last selected entry from the local storage.
      const id = localStorage.menuEntryId ? localStorage.menuEntryId : this.entries[0].id
      this.switchPage(this.entries.filter(entry => entry.id === id)[0])

      // Delete the selected entry on close the window.
      window.onclose = () => { delete localStorage.menuEntryId }
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
