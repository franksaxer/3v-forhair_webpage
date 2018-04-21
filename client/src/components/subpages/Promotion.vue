<template>
  <section class="subpage">
    <h1>{{ labels.SUBPAGE_PROMOTION_HEADER | translate }}</h1>

    <div  v-for="aktion in data.aktionen"
          class="content-box"
          v-if="data.aktionen">

      <div>
        <img v-bind:src="aktion.bild">
      </div>

      <div class="description">
        <h3 @click="editText(aktion, 'headline')">
          {{ aktion.headline }}
        </h3>

        <h5 @click="editText(aktion, 'subheadline')">
          {{ aktion.subheadline }}
        </h5>

        <p @click="editText(aktion, 'beschreibung')">{{ aktion.beschreibung }}</p>

        <div v-for="unterAktion in aktion.unterAktionen">
          <h5 @click="editText(unterAktion, 'headline')">
            {{ unterAktion.headline }}
          </h5>

          <ul @click="editText(unterAktion, 'beschreibung')">
            <li v-for="beschreibung in stringToList(unterAktion.beschreibung)">
              {{ beschreibung }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Subpage from '../../plugins/SubpageMixin'
  import { DataStoreEntries } from '../../data/DataManager'

  export default {
    name: 'promotion',

    mixins: [Subpage],

    data () {
      return {
        dataKey: DataStoreEntries.promotion.key
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import '~include-media/dist/include-media';
  @import '../../style/subpages';

  .subpage{
    .content-box{
      display: flex;
      flex-direction: row;
      margin-bottom: 20px;

      @include media("<desktop") {
        flex-direction: column;
        align-items: center;

        h3, h5 {
          text-align: center;
        }
      }

      .description {
        @include media(">=desktop") {
          width: 70%;
          margin-left: 20px;
        }

        @include media("<desktop") {
          padding: 5px;
          margin-top: 20px;
        }
      }

      ul {
        margin-bottom: 20px;
      }
    }
  }
</style>
