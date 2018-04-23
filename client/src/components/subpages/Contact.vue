<template>
  <div class="subpage">
    <h1>{{ labels.SUBPAGE_CONTACT_HEADER | translate }}</h1>
    <h2 @click="editText(data, 'subheadline')">
      {{ data.subheadline }}
    </h2>

    <div class="info content-box"
         v-if="data.telefon">

      <div class="kontakt-element">
          <i class="fa fa-phone fa-3x"></i>
          <span @click="editText(data.telefon, 'handy')">{{ data.telefon.handy }}</span>
          <span @click="editText(data.telefon, 'festnetz')">{{ data.telefon.festnetz }}</span>
      </div>

      <div class="kontakt-element">
        <i class="fa fa-envelope fa-3x"></i>
        <a :href="`mailto:${data.mail.mail}`"
           @click="editText(data.mail, 'mail')">

          {{ data.mail.mail }}
        </a>
      </div>

      <div class="kontakt-element">
        <i class="fa fa-location-arrow fa-3x"></i>
        <p @click="editText(data.adresse, 'anschrift')">{{ data.adresse.anschrift }}</p>

        <a  target="_blank" href="https://www.google.de/maps/dir/52.5335437,13.3441854/3v+for+hair,+Rankestra%C3%9Fe+24,+10789+Berlin/@52.5187527,13.3264526,14z/data=!3m1!4b1!4m16!1m6!3m5!1s0x47a850f8c68c9039:0x2768ef6840eb28e8!2s3v+for+hair!8m2!3d52.5017623!4d13.3332985!4m8!1m1!4e1!1m5!1m1!1s0x47a850f8c68c9039:0x2768ef6840eb28e8!2m2!1d13.3332985!2d52.5017623"
            class="button is-outlined is-primary">

          {{ labels.SUBPAGE_CONTACT_BTN_MAP | translate }}
        </a>

        <ul @click="editText(data.adresse, 'hinweise')">
          <i v-for="hinweis in data.adresse.hinweise">
            {{ hinweis }}
          </i>
        </ul>
      </div>

      <div class="kontakt-element">
        <i class="fa fa-clock-o fa-3x"></i>
        <p @click="editText(data.öffnungszeiten, 'tage')">{{ data.öffnungszeiten.tage }}</p>
      </div>
    </div>

    <hr>

    <div class="form content-box">
      <div class="headline">
        <h1 @click="editText(data, 'emailHeadline')">
          {{ data.emailHeadline }}
        </h1>

        <h3 @click="editText(data, 'emailSubheadline')">
          {{ data.emailSubheadline }}
        </h3>
      </div>

      <div class="form">
        <form @submit.prevent="validateBeforeSubmit">
          <div class="field">
            <div class="control">
              <input  class="input"
                      type="text"
                      :placeholder="labels.SUBPAGE_CONTACT_PH_NAME | translate">
            </div>
          </div>

          <div class="field">
            <div >
              <input  class="input"
                      type="email"
                      :placeholder="$labelStore.translate(labels.SUBPAGE_CONTACT_PH_MAIL)">
            </div>
          </div>

          <div class="field">
            <div class="control has-icons-left">
              <input  class="input"
                      type="text"
                      :placeholder="$labelStore.translate(labels.SUBPAGE_CONTACT_PH_PHONE)">

              <span class="icon is-left">
              <span><i class="fa fa-phone"></i></span>
            </span>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <textarea class="textarea"
                      :placeholder="$labelStore.translate(labels.SUBPAGE_CONTACT_PH_MESSAGE)"/>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-primary"
                      type="submit">

                {{ labels.SUBPAGE_CONTACT_BTN_SEND | translate }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import Subpage from '../../plugins/SubpageMixin'
  import { DataStoreEntries } from '../../data/DataManager'

  export default {
    name: 'kontakt',

    mixins: [Subpage],

    data () {
      return {
        name: '',
        dataKey: DataStoreEntries.kontakt.key
      }
    },

    methods: {
      validateBeforeSubmit (e) {
        this.$validator.validateAll()
        if (!this.errors.any()) {
          console.log('sendMAIL')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~include-media/dist/include-media';
  @import '../../style/subpages';

  .subpage{
    .content-box{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      text-align: center;

      &.info {
        .kontakt-element {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 46%;
          padding: 40px;

          @include media('<desktop') {
            width: 97%;
          }

          .button{
            margin: 10px;
          }

          ul {
            margin: 0;
          }
        }
      }

      &.form {
        .headline {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 46%;
          margin: 10px 2%;
          padding: 20px;

          @include media('<desktop') {
            width: 97%;
          }

          h1, h3{
            color:black!important;
            text-shadow: 0 0 0 white;
          }
        }

        .form {
          @include media('<desktop') {
            width: 90%;
          }
          margin: 10px 2%;
          padding: 20px;
          display: flex;
          width: 46%;
          flex-direction: column;
        }
      }
    }
  }



</style>
