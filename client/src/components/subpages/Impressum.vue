<template>
  <div class="subpage">
    <h1>{{ labels.SUBPAGE_IMPRESSUM_HEADER | translate }}</h1>

    <div class="impressum-box">
      <div class="left"
           v-if="data.contentImpressum"
           @click="editText(data, 'contentImpressum')" v-editable>

        <span v-for="contentImpress in stringToList(data.contentImpressum)">
          {{ contentImpress }}
        </span>
      </div>

      <div  class="right"
            v-if="data.contentCopyright"
            @click="editText(data, 'contentCopyright')" v-editable>

        <span v-for="contentCopyRight in stringToList(data.contentCopyright)">
          {{ contentCopyRight }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import Subpage from '../../plugins/SubpageMixin'
  import { DataStoreEntries } from '../../data/DataManager'

  export default {
    name: 'impressum',

    mixins: [Subpage],

    data () {
      return {
        dataKey: DataStoreEntries.impressum.key
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~include-media/dist/include-media';
  @import '../../style/subpages';

  .subpage{
    .impressum-box {
      display: flex;
      flex-direction: row;

      span {
        display: block;
        color: white;
        font-weight: bold;
        text-shadow: intenseShadow(black);
      }

      .left, .right {
        width: 50%;
        padding: 0 2%;
      }

      .left {
        text-align: right;
      }

      .right {
        text-align: left;
      }
    }
  }
</style>
