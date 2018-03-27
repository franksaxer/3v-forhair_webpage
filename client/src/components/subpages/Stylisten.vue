<template>
  <div class="container">
      <div class="werbeDiv">
        test
      </div>

    <div class="stylistenDiv">
        <div class="content">
          <div v-if="stylisten" v-for="(stylist,index) in stylisten">

            <div class="stylist">
              <div class="stylistImage">
                <figure class="image is-128x128">
                  <img v-bind:src="stylist.bild">
                </figure>
              </div>
              <div class="stylistInfo">
                <h3 class="is-4 title">{{stylist.name}}</h3>
                <h6 class="is-6 subtitle"style="margin-bottom: 10px "><em>{{stylist.kategorie}}</em></h6>
                <ul>
                  <li v-for=" stylistInfo in stylist.info">{{stylistInfo}}</li>
                </ul>
                <p>{{stylist.wartezeit}}</p>
                <h6 class="is-6"><strong>Arbeitszeit</strong></h6>
                <ul>
                  <li v-for="arbeitszeit in stylist.arbeitszeiten">{{arbeitszeit}}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

  </div>
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
        stylistenJSON: null,
        stylisten: null
      }
    },

    methods: {
      einkaufen: function () {
        this.affe = 'Heinz'
      },

      async created () {
        this.preise = await loadDataObject(DataStoreEntries.contact.key)
      }
    },

    async created () {
      this.stylistenJSON = await loadDataObject(DataStoreEntries.stylisten.key)
      this.stylisten = this.stylistenJSON.stylisten
    }

  }

</script>

<style lang="scss" scoped>

  @import '../../../node_modules/include-media/dist/include-media';

  .container{
    padding-top: 70px;
    @include media('>=desktop') {
      display: flex;
    }

    @include media('<desktop') {
      display: inline-block;
    }
  }

  .werbeDiv{
    @include media('>=desktop') {
      flex-basis: 30%;
      background: yellow;
    }

    @include media('<desktop') {
      background: yellow;
    }
  }

  .stylistenDiv{
    @include media('>=desktop') {
      flex-basis: 70%;

    }
  }

  .stylist{
    margin: 20px;
    margin-bottom: 40px;
    display: flex;
  }

  .stylistImage{
    flex-basis: 30%;
    align-items: center;
  }

  stylistInfo{
    flex-basis: 70%;
  }

</style>
