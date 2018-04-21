<template>
  <section class="subpage">
    <h1>{{ labels.SUBPAGE_COLORS_HEADER | translate }}</h1>

    <div class="subsection">
      <h2>{{ data.subheadline1 }}</h2>
      <h2>{{ data.subheadline2 }}</h2>
      <h2>
        <i class="fa fa-arrow-right"></i>
        {{ data.subheadline3 }}
        <i class="fa fa-arrow-left"></i>
      </h2>
    </div>

    <div class="content-box">
      <ul>
        <li v-for="li in data.faktList">
          {{li}}
        </li>
      </ul>
    </div>

    <div class="youtube-video">
      <youtube video-id="D7CEOHZD1qc" />
    </div>

    <hr>

    <h1>{{ labels.SUBPAGE_COLORS_POSSIBILITIES_HEADER | translate }}</h1>
    <div class="subsection">
      <div  v-for="möglichkeit in data.möglichkeiten"
            class="content-box">

        <h5>
          <i class="fa fa-angle-right"></i>
          {{ möglichkeit.title }}
        </h5>

        <p>{{ möglichkeit.content }}</p>
      </div>
    </div>

    <hr>

    <h1>{{ labels.SUBPAGE_COLORS_IMPACT_HEADER | translate }}</h1>
    <div class="subsection">
      <div  v-for="wirkprinzipien in data.wirkprinzipien"
              class="content-box">

        <h5>
          <i class="fa fa-angle-right"></i>
          {{ wirkprinzipien.title }}
        </h5>

        <p>{{ wirkprinzipien.content }}</p>
      </div>
    </div>

    <hr>

    <h1>{{ labels.SUBPAGE_COLORS_OLAPLEX_HEADER | translate }}</h1>
    <h2>{{ data.subheadline7 }}</h2>
    <div class="content-box">
      <ul>
        <li v-for="content in data.olaplexContent">
          {{ content }}
        </li>
      </ul>
    </div>

    <div class="subsection">
      <div  v-for="olaplexProdukt in data.olaplexProdukte"
            class="content-box">

        <h5>{{ olaplexProdukt.headline }}</h5>
        <p><em>{{ olaplexProdukt.description }}</em></p>
        <ul>
          <li v-for="li in olaplexProdukt.preise">
            {{li}}
          </li>
        </ul>
      </div>
    </div>
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
