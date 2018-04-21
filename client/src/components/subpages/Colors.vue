<template>
  <section class="subpage">
    <h1>{{ labels.SUBPAGE_COLORS_HEADER | translate }}</h1>

    <div class="subsection">

      <h2 @click="editText(data, 'subheadline')">
        {{ data.subheadline }}
      </h2>

      <h2 @click="editText(data, 'subheadline2')">
        <i class="fa fa-arrow-right"></i>
        {{ data.subheadline2 }}
        <i class="fa fa-arrow-left"></i>
      </h2>
    </div>

    <div class="content-box"
         v-if="data.faktList">

      <ul @click="editText(data, 'data.faktList')">
        <li v-for="fakt in stringToList(data.faktList)">
          {{ fakt }}
        </li>
      </ul>
    </div>

    <div class="youtube-video">
      <youtube video-id="D7CEOHZD1qc" />
    </div>

    <hr>

    <h1>{{ labels.SUBPAGE_COLORS_POSSIBILITIES_HEADER | translate }}</h1>
    <div class="subsection"
          v-if="data.möglichkeiten">

      <div  v-for="möglichkeit in data.möglichkeiten"
            class="content-box">

        <h5 @click="editText(möglichkeit, 'title')">
          <i class="fa fa-angle-right"></i>
          {{ möglichkeit.title }}
        </h5>

        <p @click="editText(möglichkeit, 'content')">{{ möglichkeit.content }}</p>
      </div>
    </div>

    <hr>

    <h1>{{ labels.SUBPAGE_COLORS_IMPACT_HEADER | translate }}</h1>
    <div  class="subsection"
          v-if="data.wirkprinzipien">

      <div  v-for="wirkprinzipien in data.wirkprinzipien"
            class="content-box">

        <h5 @click="editText(wirkprinzipien, 'title')">
          <i class="fa fa-angle-right"></i>
          {{ wirkprinzipien.title }}
        </h5>

        <p @click="editText(wirkprinzipien, 'content')">{{ wirkprinzipien.content }}</p>
      </div>
    </div>

    <hr>

    <template v-if="data.olaplex">
      <h1>{{ labels.SUBPAGE_COLORS_OLAPLEX_HEADER | translate }}</h1>
      <h2 @click="editText(data.olaplex, 'headline')">
        {{ data.olaplex.headline }}
      </h2>

      <div class="content-box">
        <ul @click="editText(data.olaplex, 'content')">
          <li v-for="content in stringToList(data.olaplex.content)">
            {{ content }}
          </li>
        </ul>
      </div>

      <div class="subsection">
        <div  v-for="produkt in data.olaplex.produkte"
              class="content-box">

          <h5 @click="editText(produkt, 'headline')">
            {{ produkt.headline }}
          </h5>

          <p @click="editText(produkt, 'description')"><em>{{ produkt.description }}</em></p>

          <ul @click="editText(produkt, 'preise')">
            <li v-for="preis in stringToList(produkt.preise)">
              {{ preis }}
            </li>
          </ul>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
  import Subpage from '../../plugins/SubpageMixin'
  import { DataStoreEntries } from '../../data/DataManager'

  export default {
    name: 'colors',

    mixins: [Subpage],

    data () {
      return {
        dataKey: DataStoreEntries.farbe.key
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~include-media/dist/include-media';
  @import '~font-awesome/css/font-awesome.css';
  @import '../../style/subpages';

  .subpage{
    .subsection {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: center;
      margin-bottom: 30px;

      h2 {
        margin: 10px 0;
      }

      h5 {
        margin: 0 0 5px;
      }

      .content-box{
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
