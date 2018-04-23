<template>
  <div class="subpage">
    <h1>{{ labels.SUBPAGE_STAFF_HEADER | translate }}</h1>
    <h2>{{ labels.SUBPAGE_STAFF_SUBHEADER | translate }}</h2>

    <div class="stylist-list">
      <div  v-for="(stylist, index) in data.stylisten"
            class="stylist content-box"
            v-if="data">

        <div class="stylist-image">
          <img :src="stylist.bild">
        </div>

        <div class="stylistInfo">
          <h3 @click="editText(stylist, 'name')">
            {{ stylist.name }}
          </h3>

            <router-link :to="{ name: routes.ABOUT_US }"><h6 @click="editText(stylist, 'kategorie')"><em>{{ stylist.kategorie }}</em></h6></router-link>

          <ul @click="editText(stylist, 'info')">
            <li v-for="stylistInfo in stringToList(stylist.info)">
              {{ stylistInfo }}
            </li>
          </ul>
          <p @click="editText(stylist,'urlaub')"
             v-if="$editable || stylist.urlaub" class="urlaub">Im Urlaub: {{ stylist.urlaub }}</p>

          <p  class="wartezeit" @click="editText(stylist, 'wartezeit')">{{ stylist.wartezeit }}</p>

          <h4>{{ labels.SUBPAGE_STAFF_HOURS | translate }}</h4>
          <ul @click="editText(stylist, 'arbeitszeiten')">
            <li v-for="arbeitszeit in stringToList(stylist.arbeitszeiten)">
              {{ arbeitszeit }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import Subpage from '../../plugins/SubpageMixin'
  import { DataStoreEntries } from '../../data/DataManager'
  import * as routeNames from '../../enums/RouteNames'

  export default {
    name: 'staff',

    mixins: [Subpage],

    data () {
      return {
        dataKey: DataStoreEntries.stylisten.key,
        routes: routeNames
      }
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
    justify-content: center;

    .title, .subtitle {
        color:$baseColor;
    }

    .stylist-list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .stylist{
        margin: 10px 2%;
        display: flex;
        width: 46%;
        padding-bottom: 20px;

        h6{
          text-decoration: underline;
        }

        @include media("<desktop") {
          flex-direction: column;
          align-items: center;
          width: 100%;

          h3,  h4, h6 {
            text-align: center;
          }
        }

        .stylist-image {
          @include media(">=desktop") {
            width: 30%;
            padding-right: 10px;
          }

          @include media("<desktop") {
            width: 50%;
            padding-top: 10px;
            display: flex;
            justify-content: center;
            padding-bottom: 20px;
          }
        }
        .urlaub{
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
