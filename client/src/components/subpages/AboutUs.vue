<template>
  <div class="subpage">
    <h1>{{ labels.SUBPAGE_ABOUT_US_HEADER | translate }}</h1>

    <div class="kategorie-list">
      <h2 @click="editText(data, 'subheadline')" v-editable>
        {{ data.subheadline }}
      </h2>

      <div  v-for="kategorie in data.kategorien"
            class="kategorie content-box">

        <h4 class="bezeichnung"
            @click="handleBezeichnung(kategorie)" v-editable>

          <em>{{ kategorie.bezeichnung }}</em>
        </h4>
        <ul class="beschreibungListe"
            v-for="beschreibung in stringToList(kategorie.beschreibung)"
            @click="editText(kategorie, 'beschreibung')" v-editable>

          <li>{{ beschreibung }}</li>
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
            <h6 class="caption"
                @click="editText(bild, 'title')" v-editable>
              {{ bild.title }}
            </h6>
          </div>
        </slide>
      </carousel>
    </div>

    <hr>

    <div class="aveda-mission"
         v-if="data.contentAvedaMission">
      <h1>{{ labels.SUBPAGE_ABOUT_US_AVEDA_HEADER | translate }}</h1>
      <p @click="editText(data, 'contentAvedaMission')" v-editable>{{ data.contentAvedaMission }}</p>
    </div>
  </div>
</template>

<script>
  import Subpage from '../../plugins/SubpageMixin'
  import { DataStoreEntries } from '../../data/DataManager'
  import { Carousel, Slide } from 'vue-carousel'
  import * as RouteNames from '../../enums/RouteNames'

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
    },

    methods: {
      handleBezeichnung (kategorie) {
        if (this.$editable) {
          this.editText(kategorie, 'bezeichnung')
        } else {
          this.$staffFilter.setStaffFilter(kategorie.bezeichnung)
          this.$router.push({ name: RouteNames.STAFF })
        }
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

        .bezeichnung {
          &:hover {
            cursor: pointer; // Show that a action is available.
          }
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

      width: 100%;

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
