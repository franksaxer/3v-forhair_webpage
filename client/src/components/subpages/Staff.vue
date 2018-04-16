<template>
  <section class="section subpage content">
    <h1 class="title is-size-1-desktop">Unser Team</h1>
    <h2 class="subtitle">Dich noch schöner zu machen ist unser Ziel</h2>
    <div class="content">
      <div v-if="stylisten" v-for="(stylist,index) in stylisten" class="stylist content-box">
        <div class="stylistImage">
          <img v-bind:src="stylist.bild">
        </div>
        <div class="stylistInfo">
          <h3 class="title">{{stylist.name}}</h3>
          <h6 class="subtitle" style="margin-bottom: 10px "><em>{{stylist.kategorie}}</em></h6>
          <ul>
            <li v-for=" stylistInfo in stylist.info">{{stylistInfo}}</li>
          </ul>
          <p class="wartezeit">{{stylist.wartezeit}}</p>
          <h4>Arbeitszeit</h4>
          <ul>
            <li v-for="arbeitszeit in stylist.arbeitszeiten">{{arbeitszeit}}</li>
          </ul>
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
  @import '../../style/subpages';

  .subpage{

    $baseColor: white;
    color: $baseColor;

    flex-direction: column;
    justify-content: center;

    .title, .subtitle {
        color:$baseColor;
    }

    .content {

      flex-wrap: wrap;
      display: flex;
      flex-direction: row;



      .stylist{
        @include media("<desktop") {
          flex-direction: column;
          align-items: center;

          h3,  h4, h6 {
            text-align: center;
          }
        }

        .wartezeit{
          margin:auto;
          width: 80%;
          text-align: center;
          font-style: italic;
          font-weight: bold;
          margin-bottom: 20px;
        }

        margin: 10px 2%;
        display: flex;
        width: 46%;

        .stylistImage{
          @include media(">=desktop") {
            width: 30%;
            padding-right: 10px;
          }
          @include media("<desktop") {
            width: 50%;
            padding: 0px;
            margin: auto;
          }
        }

      }

    }
  }



</style>
