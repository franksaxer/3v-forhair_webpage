<template>
  <div class="subpage">
    <h1>Preisliste für Haarschnitte und Stylings</h1>

    <div class="content-box">
     	<div class="tabs is-centered">
				<ul>
          <li :class="{'is-active': activeTab === tabs.female}">
						<a @click="switchTab(tabs.female)">
							<span class="icon">
                <i class="fa fa-female"
                   aria-hidden="true"/>
              </span>
							<h2>Preise für Sie</h2>
						</a>
					</li>

          <li :class="{'is-active': activeTab === tabs.male}">
						<a @click="switchTab(tabs.male)">
							<span class="icon">
                <i class="fa fa-male"
                   aria-hidden="true"/>
              </span>
							<h2>Preise für Ihn</h2>
						</a>
					</li>

          <li :class="{'is-active': activeTab === tabs.colors}">
						<a @click="switchTab(tabs.colors)">
							<span class="icon">
                <i class="fa fa-paint-brush"
                   aria-hidden="true"/>
              </span>
							<h2>Preise für Farbveränderungen</h2>
						</a>
					</li>
        </ul>
      </div>

      <div v-if="activeTab === tabs.female && data.she">
        <p @click="editText(data.she, 'subheadline')" v-editable>{{ data.she.subheadline }}</p>

        <hr>

        <template v-for="table in data.she.tabellen">
          <div class="table-container">
            <table class="table is-fullwidth">
              <thead>
                <th></th>
                <th v-for="head in table.header"
                    @click="editText(table, 'header')" v-editable>
                  {{ head }}
                </th>
              </thead>

              <tbody>
                <tr v-for="(row, index) in table.rows"
                    @click="editText(table.rows, index)" v-editable>

                  <td v-for="column in row">
                    {{ column }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr>
        </template>

        <h3>Hinweis</h3>
        <p @click="editText(data.she, 'hinweis')" v-editable>{{ data.she.hinweis }}</p>

        <hr>

        <div class="aktionen-list">
          <carousel :perPage="1"
                    :navigationEnabled="true">

            <slide  v-for="(aktion,index) in data.she.angebote"
                    :key="index">

              <div class="aktion">
                <div class="image-container"
                     :style="[{'background-image': 'url(' + aktion.bild + ')'}]"/>

                <div class="aktion-description">
                  <h5 @click="editText(aktion, 'headline')" v-editable>
                    {{ aktion.headline }}
                  </h5>

                  <h6 @click="editText(aktion, 'dauer')" v-editable>
                    <em>{{ aktion.dauer }}</em>
                  </h6>

                  <ul @click="editText(aktion, 'beschreibung')" v-editable>
                    <li v-for="be in stringToList(aktion.beschreibung)">
                      {{ be }}
                    </li>
                  </ul>
                </div>
              </div>
            </slide>
          </carousel>
        </div>
      </div>

      <div class="tab-pane"
           v-if="activeTab === tabs.male && data.he">

        <p @click="editText(data.he, 'subheadline')" v-editable>{{ data.he.subheadline}}</p>

        <hr>

        <template v-for="table in data.he.tabellen">
          <div class="table-container">
            <table class="table is-fullwidth">
              <thead>
                  <th></th>
                  <th v-for="head in table.header"
                      @click="editText(table.header)" v-editable>
                    {{ head }}
                  </th>
              </thead>

              <tbody>
                <tr v-for="(row, index) in table.rows"
                    @click="editText(table.rows, index)" v-editable>
                  <td v-for="column in row">
                    {{ column }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr>
        </template>

        <h3>Reine Männersache</h3>
        <p @click="editText(data.he, 'content')" v-editable>{{ data.he.content }}</p>

        <hr>

        <div class="aktionen-list">
          <carousel :perPage="1"
                    :navigationEnabled="true">

            <slide  v-for="(aktion,index) in data.he.angebote"
                    :key="index">

              <div class="aktion">
                <div class="image-container"
                     :style="[{'background-image': 'url(' + aktion.bild + ')'}]"/>

                <div class="aktion-description">
                  <h5 @click="editText(aktion, 'headline')" v-editable>
                    {{ aktion.headline }}
                  </h5>

                  <h6 @click="editText(aktion, 'dauer')" v-editable>
                    <em>{{ aktion.dauer }}</em>
                  </h6>

                  <ul @click="editText(aktion, 'beschreibung')" v-editable>
                    <li v-for="be in stringToList(aktion.beschreibung)">
                      {{ be }}
                    </li>
                  </ul>
                </div>
              </div>
            </slide>
          </carousel>
        </div>
      </div>

      <div class="tab-pane"
           v-if="activeTab === tabs.colors && data.colors">

        <p @click="editText(data.colors, 'subheadline')" v-editable>{{ data.colors.subheadline }}</p>

        <p @click="editText(data.colors, 'link')" v-editable>{{ data.colors.link }} <router-link :to="{ name: colorRoute }">Hier</router-link>
        </p>

        <hr>

        <div v-for="table in data.colors.tabellen">
          <h5 @click="editText(table, 'tHeadline')" v-editable>
            {{ table.tHeadline }}
          </h5>

          <h6 @click="editText(table, 'tSubHeadline')" v-editable>
            <em>{{ table.tSubHeadline }}</em>
          </h6>

          <div class="table-container">
            <table  v-for="subtable in table.subtabelle"
                    class="table is-fullwidth">

              <thead>

                  <th v-if="subtable.header.length != 0"></th>
                  <th v-for="head in subtable.header"
                      v-if="subtable.header.length != 0"
                      @click="editText(subtable, 'header')" v-editable>
                      {{ head }}
                  </th>
              </thead>

              <tbody>
                <tr v-for="(row, index) in subtable.rows"
                    @click="editText(subtable.rows, index)" v-editable>

                  <td v-for="column in row"
                      width="50px"
                      v-if="index == 0">

                    {{ column }}
                  </td>

                  <td v-for="column in row"
                      v-if="index != 0">

                    {{ column }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Subpage from '../../plugins/SubpageMixin'
import { DataStoreEntries } from '../../data/DataManager'
import * as RouteNames from '../../enums/RouteNames'
import { Carousel, Slide } from 'vue-carousel'

const TABS = {
  female: 'e60de54531c9b122ccfa19eca3af8f2b',
  male: '962453969e3902726b0383031df65031',
  colors: '7fcb1f9a47b22bda6eec8ca02584aaa5'
}

export default {
  name: 'costs',

  mixins: [Subpage],

  components: {
    Carousel,
    Slide
  },

  data() {
    return {
      dataKey: DataStoreEntries.costs.key,
      colorRoute: RouteNames.COLORS,
      tabs: TABS,
      activeTab: TABS.female // The currently selected tab pane.
    }
  },

  methods: {
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
  h1 {
    margin-bottom: 30px;
  }

  h3,
  h5,
  h6 {
    text-shadow: decentShadow(black);
    color: rgb(217, 159, 58);
    font-weight: bold;
  }

  .content-box {
    min-width: 100%; // Fixed size, to is does not change for each tab.

    .tabs {
      i {
        font-size: 1.2rem;
      }

      .is-active {
        h2 {
          color: $primary;
          text-shadow: none;
        }
      }
    }

    .table-container {
      border-radius: 10px;
      overflow: auto;
      margin-top: 10px;
      width: 100%;
    }

    p {
      margin-bottom: 10px;
    }

    .aktionen-list {
      margin-top: 40px;

      .aktion {
        display: flex;

        @include media('<desktop') {
          flex-direction: column;
        }

        .image-container {
          min-width: 40%; // Get a stable shape.
          height: 300px;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          border-radius: 1.5rem;
          margin-right: 15px;

          @include media('<desktop') {
            margin-bottom: 20px;
            height: 50vw;
          }
        }

        .aktion-description {
          margin: auto;

          @include media('<desktop') {
            text-align: justify;

            h5,
            h6 {
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>
