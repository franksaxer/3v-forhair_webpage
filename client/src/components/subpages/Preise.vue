<template>
  <div class="container">
    <h1 class="title is-4 has-text-centered">Preisliste für Haarschnitte und Stylings</h1>
    <div class="content">
      <tabs animation="slide" :only-fade="false">
        <tab-pane label="Preise für Sie">
          <h3 v-if="preiseFürSie" class="subtitle is-6">{{preiseFürSie.subheadline}}</h3>

          <table v-if="preiseFürSieTabllen" v-for="table in preiseFürSieTabllen" class="table is-striped">
            <thead>
            <tr>
              <th></th>
              <th v-for="head in table.header">
                {{head}}
              </th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="row in table.rows">
              <td v-for="column in row">{{column}}</td>
            </tr>
            </tbody>

          </table>

        </tab-pane>
        <tab-pane label="Preise für Ihn">
          <h3 v-if="preiseFürIhn" class="subtitle is-6">{{preiseFürIhn.subheadline}}</h3>

          <table v-if="preiseFürIhnTabllen" v-for="table in preiseFürIhnTabllen" class="table is-striped">
            <thead>
            <tr>
              <th></th>
              <th v-for="head in table.header">
                {{head}}
              </th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="row in table.rows">
              <td v-for="column in row">{{column}}</td>
            </tr>
            </tbody>
          </table>
        </tab-pane>
      </tabs>
    </div>
  </div>
</template>

<script>
  import {DataStoreEntries, loadDataObject} from '../../data/DataManager'
  import { Tabs, TabPane } from 'vue-bulma-tabs'

  export default {
    name: 'preise',

    components: {
      Tabs,
      TabPane
    },

    props: {
      name: {type: String}
    },

    data () {
      return {
        preiseFürIhn: null,
        preiseFürSie: null,
        preiseFürSieHeader: null
      }
    },

    methods: {
      einkaufen: function () {
        this.affe = 'Heinz'
      },

      async created () {
        this.preise = await loadDataObject(DataStoreEntries.contact.key)
      }
    },

    async created () {
      this.preiseFürIhn = await loadDataObject(DataStoreEntries.preiseFürIhn.key)
      this.preiseFürSie = await loadDataObject(DataStoreEntries.preiseFürSie.key)
      this.preiseFürSieTabllen = this.preiseFürSie.tabellen
      this.preiseFürIhnTabllen = this.preiseFürIhn.tabellen
    }

  }

</script>

<style lang="scss" scoped>
  .container{
    padding-top: 70px;
  }

  .content{
    display: flex;
    padding-left: 100px;
  }

  .item{
    max-width: 50%;
  }


</style>
