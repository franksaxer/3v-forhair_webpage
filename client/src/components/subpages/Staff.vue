<template>
  <div class="subpage">
    <h1>Unser Team</h1>
    <h2>Dich noch schöner zu machen ist unser Ziel!</h2>

    <div class="stylist-list">
      <div class="field has-addons search">
        <div class="control has-icons-right">

          <input  v-model="filter"
                  class="input"
                  type="text"
                  placeholder="Kategorie">

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

          <div class="categorie-container">
            <span :class="['tag', 'is-rounded', { 'clickable': !$editable }]"
                  @click="clickStylistCategorie(stylist)" v-editable>

                  {{ stylist.kategorie }}
            </span>
          </div>

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

          <h4 class="working-hours">Arbeitszeit</h4>
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
  flex-direction: column;
  justify-content: top;

  .content-box {
    border-color: $primary;
  }

  .stylist-list {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    $width: 90%;

    .search {
      margin-right: calc(
        (100% - #{$width}) / 2
      ); // Be aligned with the stylist containers.
      margin-left: auto; // Shift to the right.

      @include media('<desktop') {
        width: $width; // Be as width as the stylist container.
      }

      .control {
        @include media('<desktop') {
          &.has-icons-right {
            min-width: 100%; // Be as width as the stylist entries.
          }

          .button {
            // Cause of the unpredictable width, the combination with the previous element makes it
            // impossible to get the full width.
            display: none;
          }
        }
      }
    }

    .stylist {
      position: relative;
      display: flex;
      margin: 10px auto;
      width: $width;
      padding-bottom: 20px;

      @include media('<desktop') {
        flex-direction: column;
        align-items: center;
        padding-top: 50px;

        h3,
        h4,
        h6 {
          text-align: center;
        }
      }

      h3,
      h4,
      h6 {
        font-weight: bold;
        color: black;
        text-shadow: none;
      }

      .categorie-container {
        max-width: 80vw;
        margin-top: 30px;

        .tag {
          font-size: 0.9rem;
        }
      }

      .stylistInfo {
        padding: 10px;

        .clickable {
          &:hover {
            cursor: pointer !important;
          }
        }

        .working-hours {
          margin-top: 10px;
        }

        .categorie-container {
          @include media('<desktop') {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      }

      .stylist-image {
        width: 30%;
        height: auto;
        padding-right: 20px;

        @include media('<desktop') {
          width: 50%;
          padding-right: 0;
          padding-bottom: 20px;
        }

        img {
          width: 100%;
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
