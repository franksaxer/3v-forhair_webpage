<template>
  <section class="section">
    <div class="container">
      <div class="container3v">
        <h1 class="title">Über Uns</h1>
        <h2 class="subtitle">{{ueberUns.subheadline}}</h2>
        <div class="container3v">
          <div class="ueberUnsDiv">
            <div class="container3v"></div>

          </div>

          <div class="salonDiv">
            test
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {DataStoreEntries, loadDataObject} from '../../data/DataManager'
  import { Tabs, TabPane } from 'vue-bulma-tabs'

  export default {
    name: 'preise',

    components: {
      Tabs,
      TabPane
    },

    props: {
      name: {type: String}
    },

    data () {
      return {
        ueberUns: null
      }
    },

    methods: {
      einkaufen: function () {
        this.affe = 'Heinz'
      }
    },

    async created () {
      this.ueberUns = await loadDataObject(DataStoreEntries.ueberUns.key)
    }

  }

</script>

<style lang="scss" scoped>

  @import '../../../node_modules/include-media/dist/include-media';

  .container3v{
    padding-left: 100px;
  }

  .ueberUnsDiv{
    @include media('>=desktop') {
      flex-basis: 40%;
      background: yellow;
    }

    @include media('<desktop') {
      background: yellow;
    }
  }

  .salonDiv{
    @include media('>=desktop') {
      flex-basis: 50%;
      background: pink;
    }
  }


  .container3v{
    @include media('>=desktop') {
      display: flex;
    }

    @include media('<desktop') {
      display: inline-block;
    }
  }
</style>
