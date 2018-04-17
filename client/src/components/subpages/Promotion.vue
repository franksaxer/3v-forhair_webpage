<template>
  <section class="section subpage content">
    <h1>{{promotation.headline}}</h1>
    <div v-for="aktion in promotation.aktionen" class="content-box">
      <div class="contentAktion">
        <h3>{{aktion.headline}}</h3>
        <h4 v-if="aktion.subheadline">{{aktion.subheadline}}</h4>
        <h5 v-if="aktion.beschreibung">{{aktion.beschreibung}}</h5>
        <div v-for="unterAktion in aktion.unterAktionen">
          <h5 v-if="unterAktion.headline">{{unterAktion.headline}}</h5>
          <ul>
            <li v-for="beschreibung in unterAktion.beschreibung">{{beschreibung}}</li>
          </ul>
        </div>
      </div>
      <div class="contentImage">
        <img v-bind:src="aktion.bild">
      </div>
    </div>
  </section>
</template>

<script>
  import {DataStoreEntries, loadDataObject} from '../../data/DataManager'

  export default {
    name: 'promotation',

    components: {
    },

    props: {
      name: {type: String}
    },

    data () {
      return {
        promotation: {}
      }
    },

    methods: {

    },

    async created () {
      this.promotation = await loadDataObject(DataStoreEntries.promotation.key)
    }

  }

</script>

<style lang="scss" scoped>
  @import '../../../node_modules/include-media/dist/include-media';
  @import '../../style/subpages';

  .subpage{
    flex-direction: column;
    align-items: center;

    .content-box{
      padding: 20px;
      width: 70%;
      display: flex;
      margin-bottom: 20px;

      h1, h3,h4,h5,p,ul{
        color:black;
        line-height: 1.4;
        $shadowColor:white;
        text-shadow:
          0 0 2px $shadowColor,
          0 0 2px $shadowColor,
          0 0 2px $shadowColor
      }

      p {
        line-height: 1.6;
      }

      @include media("<desktop") {
        flex-direction: column;
        align-items: center;

        h3,  h4, h6 {
          text-align: center;
        }
      }

      .contentAktion {
        @include media(">=desktop") {
          width: 70%;
          padding-right: 10px;
        }
        @include media("<desktop") {
          width: 90%;
          padding: 0px;
          margin: auto;
        }
      }

      ul{
        margin-bottom: 30px;
      }

    }



  }


</style>
