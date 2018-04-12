<template>
  <div class="container">
    <div class="item">
      <h6>{{welcomeText.welcomeHeadline}}</h6>
    </div>
    <div class="item">
      <p>
        {{welcomeText.welcomeMainText}}
      </p>
    </div>
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
        this.welcomeText = await loadDataObject(DataStoreEntries.contact.key)
      }
    },
    async created () {
      this.welcomeText = await loadDataObject(DataStoreEntries.welcome.key)
      console.log(this.welcomeText)
    }

  }

</script>

<style lang="scss" scoped>
  .container{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }

  .item{
    p{
      text-align: center;
    }

  }

</style>
