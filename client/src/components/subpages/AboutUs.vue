<template>
  <section class="subpage">
    <h1>{{ labels.SUBPAGE_ABOUT_US_HEADER | translate }}</h1>

    <div class="kategorie-list">
      <h2>{{ data.subheadline }}</h2>
      <div  v-for="kategorie in data.kategorien"
            class="kategorie content-box">

        <h4><em>{{ kategorie.bezeichnung }}</em></h4>
        <ul class="beschreibungListe">
          <li v-for="beschreibung in kategorie.beschreibung">
            {{ beschreibung }}
          </li>
        </ul>
      </div>
    </div>

    <hr>

    <div class="salon">
      <h1>{{ labels.SUBPAGE_ABOUT_US_SALON_HEADER | translate }}</h1>
      <carousel :perPage="1">
        <slide  v-for="(bild,index) in data.salonBilder"
                :key="index"
                v-if="data">

          <div class="bild">
            <img :src="bild.url">
            <h6 class="caption">
              {{ bild.title }}
            </h6>
          </div>
        </slide>
      </carousel>
    </div>

    <hr>

    <div class="aveda-mission">
      <h1>{{ labels.SUBPAGE_ABOUT_US_AVEDA_HEADER | translate }}</h1>
      <span v-for="aveda in data.contentAvedaMission">
        {{ aveda }}
      </span>
    </div>
  </section>
</template>

<script>
  import Subpage from '../../plugins/SubpageMixin'
  import { DataStoreEntries } from '../../data/DataManager'
  import { Carousel, Slide } from 'vue-carousel'

  export default {
    name: 'aboutus',

    mixins: [Subpage],

    components: {
      Carousel,
      Slide
    },

    data () {
      return {
        dataKey: DataStoreEntries.ueberUns.key
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import '~include-media/dist/include-media';
  @import '../../style/subpages';

  .subpage{
    .kategorie-list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .kategorie {
        margin: 10px 2%;

        @include media('>=desktop') {
          width: 29%;
        }

        .beschreibungListe {
          margin-top: 5px;
        }
      }
    }

    .salon {
      .caption {
        text-align: center;
        font-style: italic;
      }

      .bild {
        @function calcWidth($reference) {
          @return calc(#{$reference} * 0.8);
        }

        @function calcMargin($reference) {
          $width: calcWidth($reference);
          @return calc((100% - #{$width}) / 2);
        }

        width: calcWidth(100%);
        margin: 20px calcMargin(100%) 0;

        $threshold: 1000px;

        @media all and (min-width: $threshold) {
          width: calcWidth($threshold);
          margin: 20px calcMargin($threshold) 0;
        }
      }
    }

    .aveda-mission {
      display: block;
      text-align: center;
      color: white;
      font-weight: bold;
    }
  }
</style>
