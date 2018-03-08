<template>
  <div class="content">
    <h6>{{welcomeText.welcomeHeadline}}</h6>
    <p>
      {{welcomeText.welcomeMainText}}
    </p>
  </div>
</template>

<script>
  import {DataStoreEntries, loadDataObject} from '../../data/DataManager'

  export default {
    name: 'welcome',

    props: {
      name: {type: String}
    },

    data () {
      return {
        welcomeText: null
      }
    },

    methods: {
      einkaufen: function () {
        this.affe = 'Heinz'
      },

      async created () {
        console.log('Test22')
        this.welcomeText = await loadDataObject(DataStoreEntries.contact.key)
        console.log('Hekllo')
        console.log(this.welcomeText)
      }
    },
    async created () {
      console.log('Test22')
      this.welcomeText = await loadDataObject(DataStoreEntries.welcome.key)
      console.log('Hekllo')
      console.log(this.welcomeText)
    }

  }

</script>

<style lang="scss" scoped>

</style>
