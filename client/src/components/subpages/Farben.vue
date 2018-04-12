<template>
  <section class="section subpage">
    <h1 class="title">{{farbe.headline}}</h1>

    <div class="indroduction">
      <h5 class="subtitle subtitleWithoutMargin is-5">{{farbe.subheadline1}} {{farbe.subheadline2}}</h5>
      <h5 class="subtitle subtitleWithoutMargin is-5"> <i class=" fa fa-arrow-right"></i> {{farbe.subheadline3}} <i class=" fa fa-arrow-left"></i></h5>
    </div>
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
        <h5 class="title is-5"><i class="fa fa-angle-right"></i> {{möglichkeit.title}}</h5>
        <h6 class="subtitle is-6">{{möglichkeit.content}}</h6>
      </div>
    </div>

    <h2 class="title">{{farbe.subheadline5}}</h2>
    <div class="myContainer">
      <div v-for="wirkprinzipien in farbe.wirkprinzipien" class="myItem">
        <h5 class="title is-5"><i class="fa fa-angle-right"></i> {{wirkprinzipien.title}}</h5>
        <h6 class="subtitle is-6">{{wirkprinzipien.content}}</h6>
      </div>
    </div>

    <h2 class="title">{{farbe.subheadline6}}</h2>
    <h2 class="subtitle subtitleWithoutMargin">{{farbe.subheadline7}}</h2>
    <div class="content">
      <ul>
        <li v-for="content in farbe.olaplexContent">{{content}}</li>
      </ul>
    </div>
    <div class="myContainer">
      <div v-for="olaplexProdukt in farbe.olaplexProdukte" class="myItem">
        <h5 class="title is-5">{{olaplexProdukt.headline}}</h5>
        <h6 class="subtitle is-6 subtitleWithoutMargin"><em>{{olaplexProdukt.description}}</em></h6>
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
  @import '../../../node_modules/font-awesome/css/font-awesome.css';

  .subpage{
    flex-direction: column;

    .indroduction{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .answer{
        margin-top: 15px;
        margin-bottom: 100px;
      }

    }


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

    .subtitleWithoutMargin{
      margin-bottom: 0px !important;
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
