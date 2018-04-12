<template>
  <section class="section subpage">
    <h1>{{farbe.headline}}</h1>

    <div class="indroduction">
      <h2>{{farbe.subheadline1}} {{farbe.subheadline2}}</h2>
      <h2> <i class=" fa fa-arrow-right"></i> {{farbe.subheadline3}} <i class=" fa fa-arrow-left"></i></h2>
    </div>
    <div class="content-box">
      <ul>
        <li v-for="li in farbe.faktList">{{li}}</li>
      </ul>
    </div>
      <div class="youtubeVideo">
        <youtube video-id="D7CEOHZD1qc" />
      </div>

    <h1>{{farbe.subheadline4}}</h1>
    <div class="myContainer">
      <div v-for="möglichkeit in farbe.möglichkeiten" class="content-box">
        <h5><i class="fa fa-angle-right"></i> {{möglichkeit.title}}</h5>
        <p>{{möglichkeit.content}}</p>
      </div>
    </div>
    <hr>
    <h1>{{farbe.subheadline5}}</h1>
    <div class="myContainer">
      <div v-for="wirkprinzipien in farbe.wirkprinzipien" class="content-box">
        <h5><i class="fa fa-angle-right"></i> {{wirkprinzipien.title}}</h5>
        <p>{{wirkprinzipien.content}}</p>
      </div>
    </div>

    <hr>

    <h1>{{farbe.subheadline6}}</h1>
    <h2 style="margin-bottom: 40px">{{farbe.subheadline7}}</h2>
    <div class="content-box">
      <ul>
        <li v-for="content in farbe.olaplexContent">{{content}}</li>
      </ul>
    </div>
    <div class="myContainer">
      <div v-for="olaplexProdukt in farbe.olaplexProdukte" class="content-box">
        <h5>{{olaplexProdukt.headline}}</h5>
        <p><em>{{olaplexProdukt.description}}</em></p>
        <ul>
          <li v-for="li in olaplexProdukt.preise">{{li}}</li>
        </ul>
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

    h2{
      margin:5px 0;
    }

    .indroduction{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 40px;

    }

    .youtubeVideo{
      margin: 90px auto 20px;
    }

    .myContainer{
      flex-wrap: wrap;
      display: flex;
      flex-direction: row;
      margin-bottom: 10px;

      .content-box{
        @include media('<desktop') {
          width: 90%;
        }
        margin: 10px 2%;
        width: 46%;
      }

    }
  }


</style>
