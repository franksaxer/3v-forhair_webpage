<template>
  <section class="section subpage">
    <h1 class="title">Über Uns</h1>
    <h2 class="subtitle">{{ueberUns.subheadline}}</h2>
    <div class="contentÜber">
      <div v-for="kategorie in ueberUns.kategorien" class="kategorie content-box">
        <h4 class="is-4"><em>{{kategorie.bezeichnung}}</em></h4>
        <ul class="beschreibungListe">
          <li v-for="beschreibung in kategorie.beschreibung">{{beschreibung}}</li>
        </ul>
      </div>
    </div>
      <hr>
      <h1 class="title">Unser Salon</h1>
      <div class="salon">
        <carousel :perPage="1">
          <slide v-if="ueberUns" v-for="(bild,index) in ueberUns.salonBilder" :key="index">
            <div class="bild">
                <img class="img" v-bind:src="bild.url">
                <h6 style="text-align: center"><em>{{bild.title}}</em></h6>
            </div>
          </slide>
        </carousel>
      </div>
  </section>
</template>

<script>
  import {DataStoreEntries, loadDataObject} from '../../data/DataManager'
  import { Tabs, TabPane } from 'vue-bulma-tabs'
  import { Carousel, Slide } from 'vue-carousel'

  export default {
    name: 'preise',

    components: {
      Tabs,
      TabPane,
      Carousel,
      Slide
    },

    props: {
      name: {type: String}
    },

    data () {
      return {
        ueberUns: {}
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
  @import '../../style/subpages';

  .subpage{
    flex-direction: column;
    justify-content: center;
    .contentÜber{
      flex-wrap: wrap;
      display: flex;
      flex-direction: row;

      .kategorie{
        display: flex;
        flex-direction: column;
        width: 29%;
        margin: 10px 2%;

        .beschreibungListe {
          margin-top: 5px;
        }

      }

      .salon{
        margin-top: 20px;
        width: 200px!important;

        .bild{
          @media all and (max-width: 1500px) {
            width: 80%;
          }
        }

      }
    }
  }


</style>
