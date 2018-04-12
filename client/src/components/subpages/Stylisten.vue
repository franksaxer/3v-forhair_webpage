<template>
  <section class="section subpage" :style="[{'background-image': 'url(' + background +')'}]">
    <h1 class="title">Unser Team</h1>
    <h2 class="subtitle">Dich noch schöner zu machen ist unser Ziel</h2>
    <div class="content">
      <div v-if="stylisten" v-for="(stylist,index) in stylisten" class="stylist">
        <figure class="image stylistImage">
          <img v-bind:src="stylist.bild">
        </figure>
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

    computed: {
      background () {
        if (this.stylistenJSON) {
          return this.stylistenJSON.hintergrund
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
        @include media('<desktop') {
          width: 90%;
        }
        border-radius: 10px;
        color: black;
        margin: 10px 2%;
        padding:10px;
        display: flex;
        width: 46%;
        background-color: rgba( $baseColor, .7 );

        .stylistImage{
          img {
            width: 100%;
            height: auto;
          };
          width: 30%;
          height: auto;
        }

      }

    }
  }



</style>
