<template>
  <section class="subpage">
    <h1>{{ labels.SUBPAGE_COSTS_HEADER | translate }}</h1>

    <div class="content-box">
      <tabs animation="slide"
            :only-fade="false"
            v-if="data.she || data.he || data.colors">

        <tab-pane class="is-primary"
                  :label="$labelStore.translate(labels.SUBPAGE_COSTS_LABEL_SHE)">

          <p>{{ data.she.subheadline }}</p>

          <hr>

          <template v-for="table in data.she.tabellen">
            <table class="table is-striped is-fullwidth">
              <thead>
                <tr>
                  <th></th>
                  <th v-for="head in table.header">
                    {{ head }}
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="row in table.rows">
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
                  :label="$labelStore.translate(labels.SUBPAGE_COSTS_LABEL_HE)">

          <p >{{ data.he.subheadline}}</p>

          <hr>

          <template v-for="table in data.he.tabellen">
            <table class="table is-striped is-fullwidth">
              <thead>
                <tr>
                  <th></th>
                  <th v-for="head in table.header">
                    {{ head }}
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="row in table.rows">
                  <td v-for="column in row">
                    {{ column }}
                  </td>
                </tr>
              </tbody>
            </table>
            <hr>
          </template>

          <h3>Reine Männersache</h3>
          <p>
            Deinen Typ zu unterstreichen, das ist unser Ziel!<br/>
            Entspanne Dich bei einer Aroma-Kopfmassage, bevor Du mit uns zusammen Dein neues Ich gestaltest.<br/>
            Individualität und Wohlbefinden stehen hierbei an erster Stelle.
          </p>

          <hr>

          <div class="aktionen-list">
            <carousel :perPage="1"
                      :navigationEnabled="true">

              <slide  v-for="(aktion,index) in data.he.angebote"
                      :key="index">

                <div class="aktion">
                  <img :src="aktion.bild">
                  <div class="aktion-description">
                    <h5>{{ aktion.headline }}</h5>
                    <h6><em>{{ aktion.dauer }}</em></h6>
                    <ul>
                      <li v-for="be in aktion.beschreibung">
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
                  :label="$labelStore.translate(labels.SUBPAGE_COSTS_LABEL_COLORS)">

          <p>{{ data.colors.subheadline }}</p>
          <p>
            Wollen sie mehr über unsere Farben erfahren?
            <router-link :to="{ name: colorRoute }">Klicken sie hier</router-link>
          </p>

          <hr>

          <div v-for="tabelle in data.colors.tabellen">
            <h5>{{ tabelle.tHeadline }}</h5>
            <h6><em>{{ tabelle.tSubHeadline }}</em></h6>

            <table  v-for="subtabelle in tabelle.subtabelle"
                    class="table is-striped is-fullwidth">

              <thead>
                <tr>
                  <th v-if="subtabelle.header.length != 0"></th>
                  <th v-for="head in subtabelle.header"
                      v-if="subtabelle.header.length != 0">
                      {{ head }}
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(row,index) in subtabelle.rows">
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
