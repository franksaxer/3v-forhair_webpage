<template>
  <div id="languageSelector"
       class="select is-primary">

    <select title="LanguageSelection">
      <template v-for="l in languages">
        <option :selected="l === selectedLanguage"
                @click="setLanguage(l)">

          {{ l }}
        </option>
      </template>
    </select>
  </div>
</template>


<script>
  // Import enums.
  import {LanguageEnum, DefaultLanguage} from '../enums/LanguageEnum'

  export default {
    name: 'language-selector',

    props: {
      // Function to change the function in the parent component.
      setLanguage: {
        type: Function,
        required: true
      },
      /* Define the current selected language.
         Necessary for the initialization.
          Afterwards it lead to a chain reaction, but does not matter */
      selectedLanguage: {
        type: String,
        default: DefaultLanguage
      }
    },

    data: function () {
      return {
        languages: LanguageEnum // Add here, cause else it is not available for rendering.
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
