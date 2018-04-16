<template>
  <section class="section subpage">
    <h1 style="margin-bottom: 40px;">{{rezensionen.headline}}</h1>
    <div class="rezensionen">
      <div  class="renzensionBlock" v-for="rezension in rezensionen.rezensionen">
        <h1><i class="fa fa-angle-right"></i> {{rezension.headline}} <i class="fa fa-angle-left"></i></h1>
        <ul>
          <p class="contentRezension" v-for="content in rezension.content">{{content}}</p>
        </ul>
        <p class="contentRezension">{{rezension.offer}}</p>
      </div>
      <p class="linkText">{{rezensionen.linkText}}<span><a href="">hier!</a></span></p>
    </div>
  </section>
</template>

<script>
  import {DataStoreEntries, loadDataObject} from '../../data/DataManager'

  export default {
    name: 'rezensionen',

    components: {
    },

    props: {
      name: {type: String}
    },

    data () {
      return {
        rezensionen: {}
      }
    },

    methods: {

    },

    async created () {
      this.rezensionen = await loadDataObject(DataStoreEntries.rezensionen.key)
    }

  }

</script>

<style lang="scss" scoped>
  @import '../../../node_modules/include-media/dist/include-media';
  @import '../../style/subpages';

  .subpage{
    flex-direction: column;
    justify-content: center;

    .linkText{
      text-align: center;
      font-weight: bold;
      color: white  ;
      $shadowColor:black;
      text-shadow:
        0 0 2px $shadowColor,
        0 0 2px $shadowColor,

    }

    h1{
      margin-bottom: 20px;
      font-style: italic;
    }


    .renzensionBlock{
      margin-bottom: 20px;

      .contentRezension{
        text-align: center;
        font-weight: bold;
        margin-bottom: 0;
        color: rgb(250,250,210)  ;
        $shadowColor:black;
        text-shadow:
          0 0 2px $shadowColor,
          0 0 2px $shadowColor,

      }
    }

  }


</style>
