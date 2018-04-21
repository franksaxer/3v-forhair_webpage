<template>
  <section class="subpage">
    <h1>{{ labels.SUBPAGE_COSTS_HEADER | translate }}</h1>

    <div class="content-box">
      <tabs animation="slide"
            :only-fade="false"
            v-if="data.she || data.he || data.colors">

        <tab-pane class="is-primary"
                  :label="labels.SUBPAGE_COSTS_LABEL_SHE | translate">

          <p @click="editText(data.she, 'subheadline')">{{ data.she.subheadline }}</p>

          <hr>

          <template v-for="table in data.she.tabellen">
            <table class="table is-striped is-fullwidth">
              <thead>
                <tr>
                  <th></th>
                  <th v-for="head in table.header"
                      @click="editText(table, 'header')">
                    {{ head }}
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(row, index) in table.rows"
                    @click="editText(table.rows, index)">
                  <td v-for="column in row">
                    {{ column }}
                  </td>
                </tr>
              </tbody>
            </table>
            <hr>
          </template>
        </tab-pane>

        <tab-pane class="is-primary"
                  :label="labels.SUBPAGE_COSTS_LABEL_HE | translate">

          <p @click="editText(data.she, 'subheadline')">{{ data.he.subheadline}}</p>

          <hr>

          <template v-for="table in data.he.tabellen">
            <table class="table is-striped is-fullwidth">
              <thead>
                <tr>
                  <th></th>
                  <th v-for="head in table.header"
                      @click="editText(table.header)">
                    {{ head }}
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(row, index) in table.rows"
                    @click="editText(table.rows, index)">
                  <td v-for="column in row">
                    {{ column }}
                  </td>
                </tr>
              </tbody>
            </table>
            <hr>
          </template>

          <h3>Reine Männersache</h3>
          <p @click="editText(data.he, 'content')">{{ data.he.content }}</p>

          <hr>

          <div class="aktionen-list">
            <carousel :perPage="1"
                      :navigationEnabled="true">

              <slide  v-for="(aktion,index) in data.he.angebote"
                      :key="index">

                <div class="aktion">
                  <img :src="aktion.bild">
                  <div class="aktion-description">
                    <h5 @click="editText(aktion, 'headline')">
                      {{ aktion.headline }}
                    </h5>

                    <h6 @click="editText(aktion, 'dauer')">
                      <em>{{ aktion.dauer }}</em>
                    </h6>

                    <ul @click="editText(aktion, 'beschreibung')">
                      <li v-for="be in stringToList(aktion.beschreibung)">
                        {{ be }}
                      </li>
                    </ul>
                  </div>
                </div>
              </slide>
            </carousel>
          </div>
        </tab-pane>

        <tab-pane class="is-primary"
                  :label="labels.SUBPAGE_COSTS_LABEL_COLORS | translate">

          <p @click="editText(data.colors, 'subheadline')">{{ data.colors.subheadline }}</p>

          <p @click="editText(data.colors, 'link')">{{ data.colors.link }} <router-link :to="{ name: colorRoute }">Hier</router-link>
          </p>

          <hr>

          <div v-for="table in data.colors.tabellen">
            <h5 @click="editText(table, 'tHeadline')">
              {{ table.tHeadline }}
            </h5>

            <h6 @click="editText(table, 'tSubHeadline')">
              <em>{{ table.tSubHeadline }}</em>
            </h6>

            <table  v-for="subtable in table.subtabelle"
                    class="table is-striped is-fullwidth">

              <thead>
                <tr>
                  <th v-if="subtable.header.length != 0"></th>
                  <th v-for="head in subtable.header"
                      v-if="subtable.header.length != 0"
                      @click="editText(subtable, 'header')">
                      {{ head }}
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(row, index) in subtable.rows"
                    @click="editText(subtable.rows, index)">

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
        </tab-pane>
      </tabs>
    </div>
  </section>
</template>

<script>
  import Subpage from '../../plugins/SubpageMixin'
  import { DataStoreEntries } from '../../data/DataManager'
  import * as RouteNames from '../../enums/RouteNames'
  import { Tabs, TabPane } from 'vue-bulma-tabs'
  import { Carousel, Slide } from 'vue-carousel'

  export default {
    name: 'costs',

    mixins: [Subpage],

    components: {
      Tabs,
      TabPane,
      Carousel,
      Slide
    },

    data () {
      return {
        dataKey: DataStoreEntries.costs.key,
        colorRoute: RouteNames.COLORS
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
</style>
