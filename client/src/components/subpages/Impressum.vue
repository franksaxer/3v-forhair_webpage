<template>
  <section class="subpage">
    <h1>{{ data.headline }}</h1>

    <div class="impressum-box">
      <div class="left">
        <span v-for="contentImpress in data.contentImpressum">
          {{ contentImpress }}
        </span>
      </div>

      <div class="right">
        <span v-for="contentCopyRight in data.contentCopyright">
          {{ contentCopyRight }}
        </span>
      </div>
    </div>
  </section>
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
