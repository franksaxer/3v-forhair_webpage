<template>
  <div class="select">
    <select>
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

</style>
