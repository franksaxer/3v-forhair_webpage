<template>
  <div class="subpage">
    <h1>Das denken Kunden über uns:</h1>

    <div  v-for="(rezension, index) in data.rezensionen"
          class="renzension">

      <h2 @click="editText(rezension, 'headline')" v-editable>
        <i class="fa fa-angle-right"></i>
        {{ rezension.headline }}
        <i class="fa fa-angle-left"></i>
      </h2>

      <p  class="content"
          @click="editText(rezension, 'content')" v-editable>{{ rezension.content }}</p>

      <p class="offer"
          @click="editText(rezension, 'offer')" v-editable>{{ rezension.offer }}</p>

      <button class="delete"
              aria-label="close"
              @click="removeElement(data.rezensionen, index)"
              v-if="$editable" />
    </div>

    <p class="linkText">
      {{ data.linkText }}
      <span>
        <a target="_blank" href="https://www.kennstdueinen.de/friseur-berlin-3v-for-hair-aveda-concept-salon-d99442.html">hier!</a>
      </span>
    </p>

    <vue-goodshare-facebook
      page_url="https://www.facebook.com/3v-for-hair-229943350464141"
      title_social="Facebook"
      has_counter
      has_icon/>
  </div>
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

  data() {
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

.subpage {
  text-align: center;
  font-weight: bold;
  color: white;

  h1 {
    margin-bottom: 40px;
  }

  h2 {
    margin-bottom: 20px;
    font-style: italic;
  }

  .renzension {
    position: relative;
    margin-bottom: 40px;
    text-shadow: decentShadow(black);

    .content {
      color: rgb(250, 250, 210);
      margin-bottom: 5px;
    }

    .offer {
      font-style: italic;
    }

    .delete {
      background-color: red !important;
    }
  }

  .linkText {
    margin-top: 40px;

    a {
      text-decoration: underline;

      &:hover {
        text-shadow: decentShadow(white);
      }
    }
    // text-shadow: decentShadow(white);
  }
}
</style>
