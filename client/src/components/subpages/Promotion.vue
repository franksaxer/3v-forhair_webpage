<template>
  <div class="subpage">
    <h1>Angebote</h1>

    <div  v-for="(aktion, index) in data.aktionen"
          class="content-box"
          v-if="data.aktionen">

      <div>
        <img v-bind:src="aktion.bild">
      </div>

      <div class="description">
        <h3 @click="editText(aktion, 'headline')" v-editable>
          {{ aktion.headline }}
        </h3>

        <h5 @click="editText(aktion, 'subheadline')" v-editable>
          {{ aktion.subheadline }}
        </h5>

        <p @click="editText(aktion, 'beschreibung')" v-editable>{{ aktion.beschreibung }}</p>

        <div v-for="unterAktion in aktion.unterAktionen">
          <h5 @click="editText(unterAktion, 'headline')" v-editable>
            {{ unterAktion.headline }}
          </h5>

          <ul @click="editText(unterAktion, 'beschreibung')" v-editable>
            <li v-for="beschreibung in stringToList(unterAktion.beschreibung)">
              {{ beschreibung }}
            </li>
          </ul>
        </div>
      </div>

      <button class="delete"
              aria-label="close"
              @click="removeElement(data.aktionen, index)"
              v-if="$editable" />
    </div>
  </div>
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
      position: relative;
      display: flex;
      flex-direction: row;
      margin-bottom: 20px;
      background-color: rgba(27, 63, 27,.4);

      p,ul{
        color: white;
      }

      h3, h5 {
        text-shadow: none;
        font-weight: bold;
      }

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
