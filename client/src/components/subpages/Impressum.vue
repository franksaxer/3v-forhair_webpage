<template>
  <section class="section subpage">
    <h1>{{impressum.headline}}</h1>
    <div class="impressumBox">
      <div class="contentImpressum">
        <span  class="spanImpressum" v-for="contentImpress in impressum.contentImpressum">
          {{contentImpress}}
        </span>
      </div>
      <div class="contentCopyRight">
        <span  class="spanCopyRight" v-for="contentCopyRight in impressum.contentCopyright">
          {{contentCopyRight}}
        </span>
      </div>
    </div>

    <div>

    </div>
  </section>
</template>

<script>
  import {DataStoreEntries, loadDataObject} from '../../data/DataManager'

  export default {
    name: 'impressum',

    components: {
    },

    props: {
      name: {type: String}
    },

    data () {
      return {
        impressum: {}
      }
    },

    methods: {

    },

    async created () {
      this.impressum = await loadDataObject(DataStoreEntries.impressum.key)
    }

  }

</script>

<style lang="scss" scoped>
  @import '../../../node_modules/include-media/dist/include-media';
  @import '../../style/subpages';

  .subpage{
    flex-direction: column;

    .impressumBox{
      display: flex;
      flex-direction: row;

      .contentImpressum{
          width: 50%;
          padding-right: 2%;
          .spanImpressum {
            display: block;
            color: white;
            $shadowColor: black;
            text-shadow: 0 0 2px $shadowColor,
            0 0 2px $shadowColor,
            0 0 2px $shadowColor,
            0 0 2px $shadowColor,
            0 0 2px $shadowColor,
            0 0 2px $shadowColor;
            font-weight: bold;
            text-align: right;
          }

      }

      .contentCopyRight{
        display: flex;
        flex-direction: column;
        width: 50%;
        padding-left: 2%;

        .spanCopyRight{
          color: white;
          $shadowColor: black;
          text-shadow: 0 0 2px $shadowColor,
          0 0 2px $shadowColor,
          0 0 2px $shadowColor,
          0 0 2px $shadowColor,
          0 0 2px $shadowColor,
          0 0 2px $shadowColor;
          font-weight: bold;
          text-align: left;
        }

      }
    }
  }


</style>
