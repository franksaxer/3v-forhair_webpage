<template>
  <div  id="language-selector"
        class="control has-icons-left"
        v-if="$isDesktop()">
    <div class="select is-primary is-normal">
      <select>
        <option v-for="lang in list"
                :selected="lang === selected">
          {{ lang }}
        </option>
      </select>
    </div>
    <span class="icon is-left">
      <i class="fa fa-globe"></i>
    </span>
  </div>
</template>

<script>
  // Import enums.
  import * as langs from '../enums/Languages'

  export default {
    name: 'language-selector',

    data: function () {
      return {
        list: [], // The presentative label for each language.
        selected: '' // The presentative label of the selected language (part of the list).
      }
    },

    methods: {
      setLanguage: function (l) {
        this.$labelStore.setLanguage(langs[l])
      }
    },

    created: function () {
      // Get the initial selected language.
      const current = this.$labelStore.getLanguage()

      // Fill listwith the representative labels of each language.
      for (let l in langs) {
        this.list.push(l)

        // Check and set if it is the selected language.
        if (langs[l] === current) {
          this.selected = l
        }
      }
    }
  }
</script>

<style lang="scss">
  // Import 3rd party styles
  @import '~include-media/dist/include-media';
  @import '~bulma/bulma';
  // Import own styles
  @import '../style/3v-forhair';


  #language-selector {
    position: fixed;
    z-index: $menu-index;

    @include media('>=desktop') {
      // TODO: Does not work... $margin: calc((#{$footer-height} - #{$size-normal}) / 2);
      $margin: 7px;
      left: $margin;
      bottom: $margin;
    }

    @include media('<desktop') {
      // TODO: Does not work... $margin: calc((#{$header-height} - #{$size-normal}) / 2);
      $margin: 6px;
      right: $margin;
      top: $margin;
    }

    select {
      border: solid 2px $color-base;
      color: $color-base;
      background-color: transparent;

      // Shrink the selection a bit.
      padding-left: 1.5em;
      padding-right: 1.5em;
    }

    .icon {
      color: $color-base;
    }
  }
</style>
