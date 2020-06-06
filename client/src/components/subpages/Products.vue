<template>
  <div class="subpage">
    <h1>{{ labels.SUBPAGE_PRODUCTS_HEADER | translate }}</h1>

    <div class="content-box">
        <p class="promotion_text">{{data.promationText}}</p>
        <a class="promotion_text"target="_blank" :href="data.promationLinkUrl">{{data.promationLinkText}}</a>
    </div>
  </div>
</template>

<script>
import Subpage from '../../plugins/SubpageMixin'
import { DataStoreEntries } from '../../data/DataManager'

export default {
  name: 'produkte',

  mixins: [Subpage],

  data() {
    return {
      dataKey: DataStoreEntries.produkte.key
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~include-media/dist/include-media';
@import '../../style/subpages';

.subpage {
  .content-box {
    width: 60%;
    text-align: center;
    .promotion_text {
      font-size:1.3em;
      font-weight: bold;
    }
  }
}
</style>
