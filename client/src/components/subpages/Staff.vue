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

          <span :class="['tag', 'is-rounded', { 'clickable': !$editable }]"
                @click="clickStylistCategorie(stylist)" v-editable>

                {{ stylist.kategorie }}
          </span>

          <ul @click="editText(stylist, 'info')" v-editable v-if="stylist.info">
            <li v-for="stylistInfo in stringToList(stylist.info)">
              {{ stylistInfo }}
            </li>
          </ul>

          <div v-if="$editable || (stylist.urlaub && isNow(stylist.urlaub))"
             class="urlaub" v-editable>
             Im Urlaub: 
             <span @click="editText(stylist.urlaub, 'from', contentTypes.DATE)">
              {{ stylist.urlaub.from | date }}
             </span>
              - 
             <span @click="editText(stylist.urlaub, 'to', contentTypes.DATE)">
              {{ stylist.urlaub.to | date }}
             </span>
          </div>

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

  data() {
    return {
      dataKey: DataStoreEntries.stylisten.key,
      filter: ''
    }
  },

  watch: {
    filter(value) {
      this.$staffFilter.setStaffFilter(value)
    }
  },

  filters: {
    date(value) {
      // Check if any value is defined.
      if (!value) {
        return 'Date' // Placeholder for the admin who can adjust this and need something to click on.
      }

      // Try to convert the value to a valid date.
      // Could only fail for the admin, cause for the user view, the isNow function would already failed and
      // this filter is not used.
      const date = new Date(value)

      if (date === 'Invalid Date') {
        console.log('invalid')
        return value // Can't handle this.
      }

      // Disassemble the date and build reassemble it new.
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return day + '.' + month + '.' + year // Use the German format.
    }
  },

  methods: {
    /**
     * Check if the given holidays are now.
     * Return a Boolean if the current date is before the 'to' date values of the holidays.
     * Don't care about invalid dates or more.
     * Invalid dates (also if 'to' is earlier than 'from') lead to false.
     */
    isNow(holiday) {
      const now = new Date()
      const to = new Date(holiday.to)
      return now <= to
    },

    /**
     * Handle a click on stylists categorie information field.
     * Jump the subpage with the descriptions of the categorie in normal mode.
     * Allow editing when being the admin.
     */
    clickStylistCategorie(stylist) {
      console.log('click')
      if (this.$editable) {
        console.log('edit')
        this.editText(stylist, 'kategorie')
      } else {
        console.log('route')
        this.$router.push({ name: RouteNames.ABOUT_US })
      }
    }
  },

  created() {
    // Set internal filter data model.
    this.filter = this.$staffFilter.kategorie
  }
}
</script>

<style lang="scss" scoped>
@import '~include-media/dist/include-media';
@import '../../style/subpages';

.subpage {
  $baseColor: white;
  color: $baseColor;

  flex-direction: column;
  justify-content: top;

  .title,
  .subtitle {
    color: $baseColor;
  }

  .search {
    margin: 30px 2% 10px auto;
  }

  .content-box {
    border-color: $primary;
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

      h3,
      h4,
      h6 {
        font-weight: bold;
        color: black;
        text-shadow: none;
      }

      .tag {
        margin-top: 10px;
      }

      @include media('<desktop') {
        flex-direction: column;
        align-items: center;
        width: 90%;

        h3,
        h4,
        h6 {
          text-align: center;
        }
      }

      .stylistInfo {
        padding: 10px;

        .clickable {
          &:hover {
            cursor: pointer !important;
          }
        }
      }

      .stylist-image {
        @include media('>=desktop') {
          width: 30%;
          padding-right: 20px;
        }

        @include media('<desktop') {
          width: 50%;
          padding-top: 10px;
          display: flex;
          justify-content: center;
          padding-bottom: 20px;
        }
      }

      .urlaub {
        font-weight: bold;
        color: rgb(204, 51, 51);
        text-align: center;
        margin-bottom: 10px;
      }

      .wartezeit {
        margin: auto;
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
