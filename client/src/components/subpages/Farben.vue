<template>
  <section class="section subpage">
    <h1 class="title">{{farbe.headline}}</h1>
    <h3 class="subtitle" style="margin-bottom: 0px">{{farbe.subheadline1}}</h3>
    <h3 class="subtitle">{{farbe.subheadline2}}</h3>
    <h3 class="subtitle">{{farbe.subheadline3}}</h3>
    <div class="content">
      <ul>
        <li v-for="li in farbe.faktList">{{li}}</li>
      </ul>
      <div class="youtubeVideo">
        <youtube video-id="D7CEOHZD1qc" />
      </div>
    </div>
      <h2 class="title">{{farbe.subheadline4}}</h2>
      <div class="myContainer">
        <div v-for="möglichkeit in farbe.möglichkeiten" class="myItem">
          <h5 class="title is-5">{{möglichkeit.title}}</h5>
          <h5 class="subtitle is-5">{{möglichkeit.content}}</h5>
        </div>
      </div>

    <h2 class="title">{{farbe.subheadline5}}</h2>
    <div class="myContainer">
      <div v-for="wirkprinzipien in farbe.wirkprinzipien" class="myItem">
        <h5 class="title is-5">{{wirkprinzipien.title}}</h5>
        <h5 class="subtitle is-5">{{wirkprinzipien.content}}</h5>
      </div>
    </div>

    <h2 class="title">{{farbe.subheadline6}}</h2>
    <h2 class="subtitle">{{farbe.subheadline7}}</h2>
    <div class="content">
      <ul>
        <li v-for="content in farbe.olaplexContent">{{content}}</li>
      </ul>
    </div>
    <div class="myContainer">
      <div v-for="olaplexProdukt in farbe.olaplexProdukte" class="myItem">
        <h5 class="title is-5">{{olaplexProdukt.headline}}</h5>
        <h6 class="subtitle is-6"><em>{{olaplexProdukt.description}}</em></h6>
        <div class="content">
          <ul>
            <li v-for="li in olaplexProdukt.preise">{{li}}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {DataStoreEntries, loadDataObject} from '../../data/DataManager'

  export default {
    name: 'farbe',

    components: {

    },

    props: {
      name: {type: String}
    },

    data () {
      return {
        farbe: {}
      }
    },

    methods: {
      einkaufen: function () {
        this.affe = 'Heinz'
      }
    },

    async created () {
      this.farbe = await loadDataObject(DataStoreEntries.farbe.key)
    }

  }

</script>

<style lang="scss" scoped>
  @import '../../../node_modules/include-media/dist/include-media';
  @import '../../style/subpages';

  .subpage{
    flex-direction: column;

    .content {
      display: flex;
      flex-wrap: wrap;
      display: flex;
      flex-direction: row;

      .youtubeVideo{
        margin:20px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }

    .myContainer{
      flex-wrap: wrap;
      display: flex;
      flex-direction: row;
      margin-bottom: 10px;

      .myItem{
        @include media('<desktop') {
          width: 90%;
        }
        margin: 10px 2%;
        padding:10px;
        width: 46%;
      }

    }
  }


</style>
