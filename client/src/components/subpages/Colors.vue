<template>
  <div class="subpage">
    <h1>{{ labels.SUBPAGE_COLORS_HEADER | translate }}</h1>

    <div class="subsection">

      <h2 style="font-weight: bold" @click="editText(data, 'subheadline')" v-editable>
        {{ data.subheadline }}
      </h2>

      <h2 style="font-weight: bold" @click="editText(data, 'subheadline2')" v-editable>
        <i class="fa fa-arrow-right"></i>
        {{ data.subheadline2 }}
        <i class="fa fa-arrow-left"></i>
      </h2>
    </div>

    <div class="content-box"
         v-if="data.faktList">

      <ul @click="editText(data, 'data.faktList')" v-editable>
        <li v-for="fakt in stringToList(data.faktList)">
          {{ fakt }}
        </li>
      </ul>
    </div>

    <div class="youtube-video">
      <youtube video-id="D7CEOHZD1qc"
              :player-width="videoShape.width"
              :player-height="videoShape.height"/>
    </div>

    <hr>

    <h1>{{ labels.SUBPAGE_COLORS_POSSIBILITIES_HEADER | translate }}</h1>
    <div class="subsection"
          v-if="data.möglichkeiten">

      <div  v-for="möglichkeit in data.möglichkeiten"
            class="content-box">

        <h4 @click="editText(möglichkeit, 'title')" v-editable>
          <i class="fa fa-angle-right"></i>
          {{ möglichkeit.title }}
        </h4>

        <p @click="editText(möglichkeit, 'content')" v-editable>{{ möglichkeit.content }}</p>
      </div>
    </div>

    <hr>

    <h1>{{ labels.SUBPAGE_COLORS_IMPACT_HEADER | translate }}</h1>
    <div  class="subsection"
          v-if="data.wirkprinzipien">

      <div  v-for="wirkprinzipien in data.wirkprinzipien"
              class="content-box">

        <h4 @click="editText(wirkprinzipien, 'title')" v-editable>
          <i class="fa fa-angle-right"></i>
          {{ wirkprinzipien.title }}
        </h4>

        <p @click="editText(wirkprinzipien, 'content')" v-editable>{{ wirkprinzipien.content }}</p>
      </div>
    </div>

    <hr>

    <template v-if="data.olaplex">
      <h1>{{ labels.SUBPAGE_COLORS_OLAPLEX_HEADER | translate }}</h1>
      <h2 @click="editText(data.olaplex, 'headline')" v-editable>
        {{ data.olaplex.headline }}
      </h2>

      <div class="content-box">
        <ul @click="editText(data.olaplex, 'content')" v-editable>
          <li v-for="content in stringToList(data.olaplex.content)">
            {{ content }}
          </li>
        </ul>
      </div>

      <div class="subsection">
        <div  v-for="produkt in data.olaplex.produkte"
              class="content-box">

          <h4 @click="editText(produkt, 'headline')" v-editable>
            {{ produkt.headline }}
          </h4>

          <p @click="editText(produkt, 'description')" v-editable><em>{{ produkt.description }}</em></p>

          <ul v-for="liste, index in produkt.preise"
              @click="editText(produkt.preise, index)" v-editable>
            <li v-for="preis in stringToList(liste)">
              {{ preis }}
            </li>
          </ul>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Subpage from '../../plugins/SubpageMixin'
import { DataStoreEntries } from '../../data/DataManager'

export default {
  name: 'colors',

  mixins: [Subpage],

  data() {
    return {
      dataKey: DataStoreEntries.farbe.key
    }
  },

  computed: {
    videoShape() {
      const current = window.innerWidth * 0.9 // The window width with a small padding.
      let width = 800 // Set to the maximum allowed width.

      // Make sure the video fits into the window width.
      if (current < width) {
        width = current
      }

      // Define the height in relation to the width.
      const height = width * 0.6

      // Build and return the shape object.
      return {
        width: width,
        height: height
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~include-media/dist/include-media';
@import '~font-awesome/css/font-awesome.css';
@import '../../style/subpages';

.subpage {
  .subsection {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 30px;

    h2 {
      margin-top: 0;
      margin: 30px 0 !important;
    }

    h5 {
      margin: 0 0 5px;
    }

    p {
      padding-left: 10px;
    }

    ul {
      display: inline-block;
      float: left;
      margin-right: 80px;
    }

    .content-box {
      margin: 10px 2%;

      @include media('>=desktop') {
        width: 46%;
      }
    }
  }

  .youtube-video {
    margin: 50px auto 20px;
  }
}
</style>
