<template>
  <div class="subpage">
    <h1>{{ labels.SUBPAGE_PRODUCTS_HEADER | translate }}</h1>

    <div class="content-box">
     	<div class="tabs is-centered">
				<ul>
          <li :class="{'is-active': activeTab === tabs.general}">
						<a @click="switchTab(tabs.general)">
							<span class="icon is-small">
                <i class="fa fa-archive"
                   aria-hidden="true"/>
              </span>
							<h2>
                {{ labels.SUPPAGE_PRODUCTS_PRODUCTS_GENERAL | translate }}
              </h2>
						</a>
					</li>

          <li :class="{'is-active': activeTab === tabs.male}">
						<a @click="switchTab(tabs.male)">
							<span class="icon is-small">
                <i class="fa fa-male"
                   aria-hidden="true"/>
              </span>
							<h2>
                {{ labels.SUPPAGE_PRODUCTS_PRODUCTS_HIM | translate }}
              </h2>
						</a>
					</li>
        </ul>
      </div>

      <div  class="produkte"
            v-if="activeTab === tabs.general && data.produkteAllgemein">

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

      <div  class="produkteIhn"
            v-if="activeTab === tabs.male && data.produkteAllgemein">

        <h3 @click="editText(data.produkteFürIhn, 'subheadline')" v-editable>
          {{ data.produkteFürIhn.subheadline }}
        </h3>

        <img  class="imageProdukteIhn"
              :src="data.produkteFürIhn.bild">

        <div class="category"
                  v-for="produkt in data.produkteFürIhn.produkte">

          <h4 @click="editText(produkt, 'headline')" v-editable>
            {{ produkt.headline }}
          </h4>

          <ul @click="editText(produkt, 'produkte')" v-editable>
            <li v-for="item in stringToList(produkt.produkte)">{{ item }}</li>
          </ul>
        </div>
      </div>
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

const TABS = {
  general: '7beb4b54e97d1f92d9bf2e5e7e21d33a',
  male: '962453969e3902726b0383031df65031'
}

export default {
  name: 'produkte',

  mixins: [Subpage],

  data() {
    return {
      dataKey: DataStoreEntries.produkte.key,
      infoOpen: false, // Not shown per default.
      infoProdukt: {}, // Will be defined on open.
      tabs: TABS,
      activeTab: TABS.general // The currently selected tab pane.
    }
  },

  methods: {
    openInfoModal(produkt) {
      this.infoProdukt = produkt
      this.infoOpen = true
    },

    switchTab(tab) {
      this.activeTab = tab
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~include-media/dist/include-media';
@import '../../style/subpages';

.subpage {
  .content-box {
    width: 100%;

    .tabs {
      i {
        font-size: 1.1rem;
      }

      .is-active {
        h2 {
          color: $primary;
          text-shadow: none;
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
        margin-bottom: 20px;
        width: 29%;
        align-items: center;

        @include media('<desktop') {
          width: 46%;
        }

        .info {
          $color: black;
          $square: 1.3rem;

          position: absolute;
          top: 0;
          left: 0;
          width: $square;
          height: $square;
          font-size: calc(0.6 * #{$square});
          border: 1px solid $color;
          border-radius: $square;
          color: $color !important;
          background-color: transparent;

          &:hover {
            cursor: pointer;
          }
        }

        .image {
          width: 70%;
        }

        .unterschrift {
          padding-top: 10px;
          text-align: center;
        }
      }
    }

    .produkteIhn {
      display: flex;
      flex-direction: column;
      align-items: center;

      h4 {
        color: rgb(217, 159, 58);
        text-shadow: none;
        font-weight: bold;
      }

      h3 {
        color: black;
        text-shadow: none;
        font-weight: bold;
      }

      img {
        margin-top: 30px;
        margin-bottom: 30px;
      }

      .category {
        width: 50%;

        @include media('<desktop') {
          width: 100%;
        }
      }

      ul {
        margin-bottom: 15px;
      }
    }
  }
}
</style>
