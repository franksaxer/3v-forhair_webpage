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
    
    <button class="button is-primary"
            @click="modalOpen=true">

      {{ labels.SUBPAGE_IMPRESSUM_BTN | translate }}
    </button>

    <div :class="['modal', { 'is-active' : modalOpen }]">
      <div class="modal-background"></div>

      <div class="modal-content content-box"
           v-if="data.dataProtection">

        <h2 v-if="data.dataProtection.header"
            @click="editText(data.dataProtection, 'header')" v-editable>
            {{ data.dataProtection.header }}
        </h2>

        <p v-if="data.dataProtection.content"
           @click="editText(data.dataProtection, 'content')" v-editable>{{ data.dataProtection.content }}</p>
      </div>

      <button class="modal-close is-large"
              aria-label="close"
              @click="modalOpen=false"></button>
    </div>
  </div>
</template>

<script>
import Subpage from '../../plugins/SubpageMixin'
import { DataStoreEntries } from '../../data/DataManager'

export default {
  name: 'impressum',

  mixins: [Subpage],

  data() {
    return {
      dataKey: DataStoreEntries.impressum.key,
      modalOpen: false // Open the modal or close it. Closed by default.
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~include-media/dist/include-media';
@import '../../style/subpages';

.subpage {
  .impressum-box {
    display: flex;
    flex-direction: row;

    span {
      display: block;
      color: white;
      font-weight: bold;
      text-shadow: intenseShadow(black);
      font-size: 20px;
    }

    .left,
    .right {
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

  button {
    margin: 20px;
  }

  .content-box {
    text-align: justify;
    width: 90%;

    // Don't overreach a width (looks ugly on large displays).
    @media all and (min-width: 1300px) {
      max-width: 1100px !important;
    }
  }
}
</style>
