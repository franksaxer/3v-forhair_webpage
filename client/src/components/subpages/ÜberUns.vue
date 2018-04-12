<template>
  <section class="section subpage">
    <h1 class="title">Über Uns</h1>
    <h3 class="subtitle">{{ueberUns.subheadline}}</h3>
    <div class="content">
      <div v-for="kategorie in ueberUns.kategorien" class="kategorie">
        <h4 class="is-4"><em>{{kategorie.bezeichnung}}</em></h4>
        <ul class="beschreibungListe">
          <li v-for="beschreibung in kategorie.beschreibung">{{beschreibung}}</li>
        </ul>
      </div>
      <h1 class="title">Unser Salon</h1>
      <div class="salon">
        <carousel :perPage="1" style="width: auto">
          <slide v-if="ueberUns" v-for="(bild,index) in ueberUns.salonBilder">
            <div class="bild">
              <div style="display: flex; flex-direction: column">
                <img class="img" v-bind:src="bild.url">
                <p style="text-align: center"><em>{{bild.title}}</em></p>
              </div>
            </div>
          </slide>
        </carousel>
      </div>
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

    .content{

      flex-wrap: wrap;
      display: flex;
      flex-direction: row;

      .kategorie{
        @include media('<desktop') {
          width: 46%;
        }

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
        width: 100%;
        display: flex;

        .bild{
          display: flex;
          flex-wrap: wrap;
          justify-content: center;

          .img{
            height: 400px;
            width: auto;
          }
        }

      }
    }
  }


</style>
