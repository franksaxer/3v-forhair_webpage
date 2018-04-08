<template>
  <section class="section subpage">
    <h1 class="title">{{kontakt.headline}}</h1>
    <h3 class="subtitle">{{kontakt.subheadline}}</h3>
    <div class="content">

    </div>
  </section>
</template>

<script>
  import {DataStoreEntries, loadDataObject} from '../../data/DataManager'

  export default {
    name: 'kontakt',

    components: {

    },

    props: {
      name: {type: String}
    },

    data () {
      return {
        kontakt: {}
      }
    },

    methods: {
      einkaufen: function () {
        this.affe = 'Heinz'
      }
    },

    async created () {
      this.kontakt = await loadDataObject(DataStoreEntries.kontakt.key)
    }

  }

</script>

<style lang="scss" scoped>
  @import '../../../node_modules/include-media/dist/include-media';
  @import '../../style/subpages';

  .subpage{
    flex-direction: column;


  }


</style>
