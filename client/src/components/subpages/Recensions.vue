<template>
  <section class="section subpage">
    <h1>{{ labels.SUBPAGE_RECENSION_HEADER | translate }}</h1>

    <div  v-for="rezension in data.rezensionen"
          class="renzension">

      <h2 @click="editText(rezension, 'headline')">
        <i class="fa fa-angle-right"></i>
        {{ rezension.headline }}
        <i class="fa fa-angle-left"></i>
      </h2>

      <p  class="content"
          @click="editText(rezension, 'content')">{{ rezension.content }}</p>

      <p class="offer"
          @click="editText(rezension, 'offer')">{{ rezension.offer }}</p>
    </div>

    <p class="linkText">
      {{ data.linkText }}
      <span>
        <a target="_blank" href="https://www.kennstdueinen.de/friseur-berlin-3v-for-hair-aveda-concept-salon-d99442.html">hier!</a>
      </span>
    </p>

    <vue-goodshare-facebook
      page_url="https://www.facebook.com/pg/3v-for-hair-229943350464141/reviews/"
      title_social="Facebook"
      has_counter
      has_icon
    ></vue-goodshare-facebook>
  </section>
</template>

<script>
  import Subpage from '../../plugins/SubpageMixin'
  import { DataStoreEntries } from '../../data/DataManager'
  import VueGoodshareFacebook from 'vue-goodshare/src/providers/Facebook.vue'

  export default {
    name: 'rezensionen',

    mixins: [Subpage],

    components: {
      VueGoodshareFacebook
    },

    data () {
      return {
        dataKey: DataStoreEntries.rezensionen.key
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~include-media/dist/include-media';
  @import '../../style/3v-forhair';
  @import '../../style/subpages';

  .subpage{
    text-align: center;
    font-weight: bold;
    color: white  ;

    h1 {
      margin-bottom: 40px;
    }

    h2 {
      margin-bottom: 20px;
      font-style: italic;
    }

    .renzension{
      margin-bottom: 40px;
      text-shadow: decentShadow(black);

      .content {
        color: rgb(250, 250, 210)  ;
        margin-bottom: 5px;
      }

      .offer {
        font-style: italic;
      }
    }

    .linkText{
      margin-top: 40px;
      text-shadow: decentShadow(black);
    }
  }
</style>
