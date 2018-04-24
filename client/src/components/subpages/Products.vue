<template>
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
                    v-for="produkt in data.produkteAllgemein">

                  <img  class="image"
                        :src="produkt.bild">

                  <p  class="unterschrift"
                      @click="editText(produkt, 'name')" v-editable>{{ produkt.name }}</p>
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
        dataKey: DataStoreEntries.produkte.key
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
          margin: 2%;
          display: flex;
          flex-direction: column;

          @include media('<desktop') {
            width: 46%;
          }

          width: 29%;
          align-items: center;

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
