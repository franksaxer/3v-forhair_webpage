<template>
  <div class="subpage">
    <h1>{{ labels.SUBPAGE_COSTS_HEADER | translate }}</h1>

    <div class="content-box">
     	<div class="tabs is-centered">
				<ul>
          <li :class="{'is-active': activeTab === tabs.female}">
						<a @click="switchTab(tabs.female)">
							<span class="icon is-small">
                <i class="fa fa-female"
                   aria-hidden="true"/>
              </span>
							<span>
                {{ labels.SUBPAGE_COSTS_LABEL_SHE | translate }}
              </span>
						</a>
					</li>

          <li :class="{'is-active': activeTab === tabs.male}">
						<a @click="switchTab(tabs.male)">
							<span class="icon is-small">
                <i class="fa fa-male"
                   aria-hidden="true"/>
              </span>
							<span>
                {{ labels.SUBPAGE_COSTS_LABEL_HE | translate }}
              </span>
						</a>
					</li>

          <li :class="{'is-active': activeTab === tabs.colors}">
						<a @click="switchTab(tabs.colors)">
							<span class="icon is-small">
                <i class="fa fa-paint-brush"
                   aria-hidden="true"/>
              </span>
							<span>
                {{ labels.SUBPAGE_COSTS_LABEL_COLORS | translate }}
              </span>
						</a>
					</li>
        </ul>
      </div>

      <div v-if="activeTab === tabs.female && data.she">
        <p @click="editText(data.she, 'subheadline')" v-editable>{{ data.she.subheadline }}</p>

        <hr>

        <template v-for="table in data.she.tabellen">
          <table class="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th></th>
                <th v-for="head in table.header"
                    @click="editText(table, 'header')" v-editable>
                  {{ head }}
                </th>
              </tr>
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
          <hr>
        </template>
      </div>

      <div class="tab-pane"
           v-if="activeTab === tabs.male && data.he">

        <p @click="editText(data.she, 'subheadline')" v-editable>{{ data.he.subheadline}}</p>

        <hr>

        <template v-for="table in data.he.tabellen">
          <table class="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th></th>
                <th v-for="head in table.header"
                    @click="editText(table.header)" v-editable>
                  {{ head }}
                </th>
              </tr>
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
                <img :src="aktion.bild">
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

          <table  v-for="subtable in table.subtabelle"
                  class="table is-striped is-fullwidth">

            <thead>
              <tr>
                <th v-if="subtable.header.length != 0"></th>
                <th v-for="head in subtable.header"
                    v-if="subtable.header.length != 0"
                    @click="editText(subtable, 'header')" v-editable>
                    {{ head }}
                </th>
              </tr>
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

    data () {
      return {
        dataKey: DataStoreEntries.costs.key,
        colorRoute: RouteNames.COLORS,
        tabs: TABS,
        activeTab: TABS.female // The currently selected tab pane.
      }
    },

    methods: {
      switchTab (tab) {
        this.activeTab = tab
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~include-media/dist/include-media';
  @import '../../style/subpages';

  .subpage{
    h1 {
      margin-bottom: 30px;
    }

    .content-box {
      min-width: 100%; // Fixed size, to is does not change for each tab.

      table {
        margin-top: 10px;
        overflow: auto;
        border-radius: 10px;
      }

      p {
        margin-bottom: 10px;
      }

      .aktionen-list {
        margin-top: 40px;

        .aktion {
          display: flex;

          @include media("<desktop"){
            flex-direction: column;
          }

          img {
            margin: auto;
            width: 80%;
            margin-right: 20px;

            @include media("<desktop"){
              margin-bottom: 20px;
            }
          }

          .aktion-description {
            margin: auto;

            @include media('<desktop') {
              text-align: justify;

              h5, h6 {
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
</style>
