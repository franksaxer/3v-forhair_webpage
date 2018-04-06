<template>
  <section class="subpage section" :style="[{'background-image': 'url(' + background +')'}]">
    <h1 class="title">Preisliste für Haarschnitte und Stylings</h1>
    <div class="preise">
      <tabs animation="slide" :only-fade="false">
        <tab-pane  class="is-primary" label="Preise für Sie">
          <h6 v-if="preiseFürSie" class="subtitle">{{preiseFürSie.subheadline}}</h6>

          <table v-if="preiseFürSieTabllen" v-for="table in preiseFürSieTabllen" class="table is-striped">
            <thead>
            <tr>
              <th></th>
              <th v-for="head in table.header">
                {{head}}
              </th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="row in table.rows">
              <td v-for="column in row">{{column}}</td>
            </tr>
            </tbody>
          </table>
        </tab-pane>

        <tab-pane label="Preise für Ihn">
          <h3 class="subtitle">{{preiseFürIhn.subheadline}}</h3>

          <table v-if="preiseFürIhnTabllen" v-for="table in preiseFürIhnTabllen" class="table is-striped">
            <thead>
            <tr>
              <th></th>
              <th v-for="head in table.header">
                {{head}}
              </th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="row in table.rows">
              <td v-for="column in row">{{column}}</td>
            </tr>
            </tbody>
          </table>

          <h3 class=" is-3 title">Reine Männersache</h3>

          <h5 class="subtitle is-5">Deinen Typ zu unterstreichen, das ist unser Ziel! <br/>
          Entspanne Dich bei einer Aroma-Kopfmassage, bevor Du mit uns zusammen Dein neues Ich gestaltest.<br/>
          Individualität und Wohlbefinden stehen hierbei an erster Stelle.</h5>


          <div class="aktionen">
            <carousel :perPage="1":navigationEnabled="true" style="width: 100%">
              <slide v-if="preiseFürIhn" v-for="(aktion,index) in preiseFürIhn.angebote" class="slide">
                <div class="content">
                  <div class="aktionImage">
                    <img class="img" v-bind:src="aktion.bild">
                  </div>
                  <div class="aktion">
                    <h5 class="is-5 title">{{aktion.headline}}</h5>
                    <h6 class="subtitle is-6"><em>{{aktion.dauer}}</em></h6>
                    <ul>
                      <li v-for="be in aktion.beschreibung">{{be}}</li>
                    </ul>
                  </div>
                </div>
              </slide>
            </carousel>
          </div>
        </tab-pane>

        <tab-pane  class="is-primary" label="Preise für Farbveränderungen">

        </tab-pane>

      </tabs>
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
        preiseFürIhn: {},
        preiseFürSie: null,
        preiseFürFarbveränderungen: null,
        preiseFürSieHeader: null
      }
    },

    computed: {
      background () {
        if (this.preiseFürIhn) {
          return this.preiseFürIhn.hintergrund
        } else {
          return ''
        }
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
      this.preiseFürIhn = await loadDataObject(DataStoreEntries.preiseFürIhn.key)
      this.preiseFürSie = await loadDataObject(DataStoreEntries.preiseFürSie.key)
      this.preiseFürSieTabllen = this.preiseFürSie.tabellen
      this.preiseFürIhnTabllen = this.preiseFürIhn.tabellen
    }

  }

</script>

<style lang="scss" scoped>
  @import '../../../node_modules/include-media/dist/include-media';
  @import '../../style/subpages';

  $baseColor: white;
  $table-background-color: rgba( $baseColor, .7 );

  .title{
    color:$baseColor;
  }

  .table{
    background-color: rgba( $baseColor, .7 );
  }

  .subpage{
    flex-direction: column;
    background-size: 100% 100%;

    .table{
      margin-left: 20px;
    }

    .preise{
      border-radius: 10px;
      background-color: rgba( $baseColor, .7 );
    }

    .aktionen{
      margin-top: 20px;
      display: flex;

      .content{
        flex-wrap: wrap;
        display: flex;
        flex-direction: row;

        .aktion{
          display: flex;
          flex-direction: column;
          width: 40%;
          justify-content: center;
        }

        .aktionImage{
          justify-content: center;
          display: flex;
          width: 40%;
          .img{
            max-width: 100%;
            height: 100%;
          }
        }
      }


      .slide{
        padding: 0px 20px;
      }

    }


  }
</style>
