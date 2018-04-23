<template>
  <div class="subpage">
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
        <a href="">hier!</a>
      </span>
    </p>
  </div>
</template>

<script>
  import Subpage from '../../plugins/SubpageMixin'
  import { DataStoreEntries } from '../../data/DataManager'

  export default {
    name: 'rezensionen',

    mixins: [Subpage],

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
