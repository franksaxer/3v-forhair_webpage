ont<template>
  <div class="subpage">
    <h1>{{ labels.SUBPAGE_PRODUCTS_HEADER | translate }}</h1>

    <div class="content-box">
      <tabs animation="slide"
            :only-fade="false"
            v-if="data.produkteAllgemein || data.produkteFürIhn">

        <tab-pane class="is-primary"
                  :label="$labelStore.translate(labels.SUPPAGE_PRODUCTS_PRODUCTS_GENERAL)">

            <div class="produkte">
              <div  class="produkt"
                    v-for="(produkt, index) in data.produkteAllgemein">

                  <button class="info"
                          @click="openInfoModal(produkt)">

                    <i class="fa fa-info"/>
                  </button>

                  <img  class="image"
                        :src="produkt.bild">

                  <p  class="unterschrift"
                      @click="editText(produkt, 'name')" v-editable>{{ produkt.name }}</p>

                  <button class="delete"
                          aria-label="close"
                          @click="removeElement(data.produkteAllgemein, index)"
                          v-if="$editable" />
              </div>
            </div>
        </tab-pane>

        <tab-pane class="is-primary"
                  :label="$labelStore.translate(labels.SUPPAGE_PRODUCTS_PRODUCTS_HIM)">

          <div class="produkteIhn">
            <div class="headlineImage">
              <h5 @click="editText(data.produkteFürIhn, 'subheadline')" v-editable>
                {{ data.produkteFürIhn.subheadline }}
              </h5>

              <img  class="imageProdukteIhn"
                    :src="data.produkteFürIhn.bild">
            </div>

            <div v-for="produkt in data.produkteFürIhn.produkte">
              <h6 @click="editText(produkt, 'headline')" v-editable>
                {{ produkt.headline }}
              </h6>

              <ul @click="editText(produkt, 'produkte')" v-editable>
                <li v-for="item in stringToList(produkt.produkte)">{{ item }}</li>
              </ul>
            </div>
          </div>
        </tab-pane>
      </tabs>
    </div>

    <!-- Modal to show information for a selected product. -->
    <div :class="['modal', {'is-active': infoOpen}]">
      <div  class="modal-background"
            @click="infoOpen = false"/>

      <div class="modal-content">
        <section class="box">
          <button class="delete"
                  aria-label="close"
                  @click="infoOpen = false" />

          <p @click="editText(infoProdukt, 'info')" >{{ infoProdukt.info }}</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import Subpage from '../../plugins/SubpageMixin'
  import { DataStoreEntries } from '../../data/DataManager'
  import { Tabs, TabPane } from 'vue-bulma-tabs'

  export default {
    name: 'produkte',

    components: {
      Tabs,
      TabPane
    },

    mixins: [Subpage],

    data () {
      return {
        dataKey: DataStoreEntries.produkte.key,
        infoOpen: false, // Not shown per default.
        infoProdukt: {} // Will be defined on open.
      }
    },

    methods: {
      openInfoModal (produkt) {
        this.infoProdukt = produkt
        this.infoOpen = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~include-media/dist/include-media';
  @import '../../style/subpages';

  .subpage{
    .content-box {
      width: 90%;
      background-color: white;

      .produkteIhn{

        ul{
            margin-bottom: 15px;
        }

        .headlineImage{

          display: flex;
          flex-wrap: wrap;
          justify-content: center;

          .imageProdukteIhn{
            margin-top: 30px;
            margin-bottom: 30px;
          }
        }

      }

      .produkte {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;

        .produkt {
          position: relative;
          display: flex;
          flex-direction: column;
          margin: 2%;
          width: 29%;
          align-items: center;

          @include media('<desktop') {
            width: 46%;
          }

          .info {
            $color: black;
            $square: 20px;

            position: absolute;
            top: 0;
            left: 0;
            width: $square;
            height: $square;
            font-size: calc(0.6 * #{$square});
            border: 1px solid $color;
            border-radius: $square;
            color: $color!important;
            background-color: transparent;

            &:hover {
              cursor: pointer;
            }
          }

          .image {
            max-width: 160px;
            max-font-size: 150px;
          }

          .unterschrift {
            padding-top: 10px;
            text-align: center;
          }
        }
      }
    }
  }
</style>
