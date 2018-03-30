<template>
  <div id="languageSelector"
       class="select is-primary">

    <select title="LanguageSelection">
      <template v-for="l in list">
        <option @click="setLanguage(l)"
                :selected="l === selected">
          {{ l }}
        </option>
      </template>
    </select>
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
  // Import own styles
  @import '../style/3v-forhair';


  #languageSelector {
    $margin: 5px;
    position: fixed;
    left: $margin;
    bottom: $margin;
    z-index: 10;

    select {
      border: 4px solid $color-base;
      color: $color-base;
      font-weight: bold;
      background-color: transparent;
      width: 80px; // Make it a bit more narrow than per default.
    }
  }
</style>
