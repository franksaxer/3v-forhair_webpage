<template>
  <div class="subpage">
    <h1>{{ labels.SUBPAGE_STAFF_HEADER | translate }}</h1>
    <h2>{{ labels.SUBPAGE_STAFF_SUBHEADER | translate }}</h2>

    <div class="stylist-list">
      <div class="field has-addons search">
        <div class="control has-icons-right">
          <input  v-model="filter"
                  class="input"
                  type="text"
                  :placeholder="labels.SUBPAGE_STAFF_PH_SEARCH | translate">

          <span class="icon is-small is-right">
          <i class="fa fa-search"></i>
        </span>
        </div>
        <div class="control">
          <a  class="button"
              @click="filter = ''">

            <i  class="fa fa-close"
                area-hidden="true"/>
          </a>
        </div>
      </div>
      <div  v-for="(stylist, index) in data.stylisten"
            class="stylist content-box"
            v-if="data && $staffFilter.checkStaff(stylist)">

        <div class="stylist-image">
          <img :src="stylist.bild">
        </div>

        <div class="stylistInfo">
          <h3 @click="editText(stylist, 'name')" v-editable>
            {{ stylist.name }}
          </h3>

            <router-link :to="{ name: routes.ABOUT_US }">
              <span class="tag is-rounded"
                    click="editText(stylist, 'kategorie')" v-editable>

                    {{ stylist.kategorie }}
              </span>
            </router-link>

          <ul @click="editText(stylist, 'info')" v-editable v-if="stylist.info">
            <li v-for="stylistInfo in stringToList(stylist.info)">
              {{ stylistInfo }}
            </li>
          </ul>

          <p @click="editText(stylist, 'urlaub')"
             v-if="$editable || stylist.urlaub"
             class="urlaub" v-editable>Im Urlaub: {{ stylist.urlaub }}</p>

          <p  class="wartezeit" @click="editText(stylist, 'wartezeit')" v-editable>{{ stylist.wartezeit }}</p>

          <h4>{{ labels.SUBPAGE_STAFF_HOURS | translate }}</h4>
          <ul @click="editText(stylist, 'arbeitszeiten')" v-editable>
            <li v-for="arbeitszeit in stringToList(stylist.arbeitszeiten)">
              {{ arbeitszeit }}
            </li>
          </ul>
        </div>

        <button class="delete"
                aria-label="close"
                @click="removeElement(data.stylisten, index)"
                v-if="$editable" />
      </div>
    </div>
  </div>
</template>


<script>
  import Subpage from '../../plugins/SubpageMixin'
  import { DataStoreEntries } from '../../data/DataManager'
  import * as RouteNames from '../../enums/RouteNames'

  export default {
    name: 'staff',

    mixins: [Subpage],

    data () {
      return {
        dataKey: DataStoreEntries.stylisten.key,
        routes: RouteNames,
        filter: ''
      }
    },

    watch: {
      filter (value) {
        this.$staffFilter.setStaffFilter(value)
      }
    },

    created () {
      // Set internal filter data model.
      this.filter = this.$staffFilter.kategorie
    }
  }
</script>

<style lang="scss" scoped>
  @import '~include-media/dist/include-media';
  @import '../../style/subpages';

  .subpage{
    $baseColor: white;
    color: $baseColor;

    flex-direction: column;
    justify-content: top;

    .title, .subtitle {
        color:$baseColor;
    }

    .search {
      margin: 30px 2% 10px auto;
    }

    .stylist-list {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;

      .stylist {
        position: relative;
        display: flex;
        margin: 10px 2%;
        width: 96%;
        padding-bottom: 20px;

        h3, h4, h6 {
          font-weight: bold;
          color: black;
          text-shadow: none;
        }

        .tag {
          margin-top: 10px;
        }

        @include media("<desktop") {
          flex-direction: column;
          align-items: center;
          width: 90%;

          h3, h4, h6 {
            text-align: center;
          }
        }

        .stylistInfo{
          padding: 10px;
        }

        .stylist-image {
          @include media(">=desktop") {
            width: 30%;
            padding-right: 20px;
          }

          @include media("<desktop") {
            width: 50%;
            padding-top: 10px;
            display: flex;
            justify-content: center;
            padding-bottom: 20px;
          }
        }

        .urlaub {
          font-weight: bold;
          color:rgb(204,51,51);
          text-align: center;
        }

        .wartezeit{
          margin:auto;
          width: 80%;
          text-align: center;
          font-style: italic;
          font-weight: bold;
          margin-bottom: 20px;
        }
      }
    }
  }
</style>
