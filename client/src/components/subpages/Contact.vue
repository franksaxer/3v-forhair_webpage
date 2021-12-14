<template>
  <div class="subpage">
    <h1>Kontakt</h1>

    <div class="info content-box"
         v-if="data.telefon">

      <div class="kontakt-element">
          <i class="fa fa-phone fa-3x"></i>
          <span @click="editText(data.telefon, 'festnetz')" v-editable>{{ data.telefon.festnetz }}</span>
          <span @click="editText(data.telefon, 'handy')" v-editable>{{ data.telefon.handy }}</span>
      </div>

      <div class="kontakt-element">
        <i class="fa fa-envelope fa-3x"></i>
        <a :href="`mailto:${data.mail.mail}`"
           @click="editText(data.mail, 'mail')" v-editable>

          {{ data.mail.mail }}
        </a>
      </div>

      <div class="kontakt-element">
        <i class="fa fa-location-arrow fa-3x"></i>
        <p @click="editText(data.adresse, 'anschrift')" v-editable>{{ data.adresse.anschrift }}</p>

        <a
          class="button is-outlined is-primary"
          target="_blank"
          href="https://www.google.de/maps/dir/52.5335437,13.3441854/3v+for+hair,+Rankestra%C3%9Fe+24,+10789+Berlin/@52.5187527,13.3264526,14z/data=!3m1!4b1!4m16!1m6!3m5!1s0x47a850f8c68c9039:0x2768ef6840eb28e8!2s3v+for+hair!8m2!3d52.5017623!4d13.3332985!4m8!1m1!4e1!1m5!1m1!1s0x47a850f8c68c9039:0x2768ef6840eb28e8!2m2!1d13.3332985!2d52.5017623"
        >
          Karte
        </a>

        <ul @click="editText(data.adresse, 'hinweise')" v-editable>
          <i v-for="hinweis in data.adresse.hinweise">
            {{ hinweis }}
          </i>
        </ul>
      </div>

      <div class="kontakt-element">
        <i class="fa fa-clock-o fa-3x"></i>
        <p @click="editText(data.öffnungszeiten, 'tage')" v-editable>{{ data.öffnungszeiten.tage }}</p>
      </div>
    </div>

    <hr>

    <div class="form content-box">
      <div class="headline">
        <h1 @click="editText(data, 'emailHeadline')" v-editable>
          {{ data.emailHeadline }}
        </h1>
        <h4 @click="editText(data, 'subheadline')" v-editable>
          {{ data.subheadline }}
        </h4>

        <h4 @click="editText(data, 'emailSubheadline')" v-editable>
          {{ data.emailSubheadline }}
        </h4>
      </div>

      <div class="form">
        <form>
          <div class="field">
            <div class="control has-icons-left">
              <input  class="input"
                      type="text"
                      v-model="feedback[requestParameterKeys.mail.name]"
                      placeholder="Name">
              <span class="icon is-left">
              <span><i class="fa fa-users"></i></span>
            </span>
            </div>
          </div>

          <div class="field">
            <div class=" control has-icons-left">
              <input  class="input"
                      type="email"
                      v-model="feedback[requestParameterKeys.mail.mail]"
                      placeholder="E-Mail">
              <span class="icon is-left">
              <span><i class="fa fa-envelope"></i></span>
            </span>
            </div>
          </div>

          <div class="field">
            <div class="control has-icons-left">
              <input  class="input"
                      type="text"
                      v-model="feedback[requestParameterKeys.mail.phone]"
                      placeholder="Telefonnummer">
              <span class="icon is-left">
              <span><i class="fa fa-phone"></i></span>
              </span>
            </div>
          </div>

          <div class="field">
            <div class="control has-icons-left">
              <textarea class="input"
                        style="height: 120px"
                        v-model="feedback[requestParameterKeys.mail.content]"
                        placeholder="Nachricht"/>
              <span class="icon is-left">
                <span><i class="fa fa-comments"></i></span>
              </span>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-primary" @click="sendFeedback">
                Abschicken
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
import RequestParameterKeys from '../../data/json/core/RequestParamaterKeys.json'
import ApiConnector from '../../ApiConnector'

export default {
  name: 'kontakt',

  mixins: [Subpage],

  data() {
    return {
      name: '',
      dataKey: DataStoreEntries.kontakt.key,
      requestParameterKeys: RequestParameterKeys, // required to be available on render.
      feedback: {
        [RequestParameterKeys.mail.name]: '',
        [RequestParameterKeys.mail.mail]: '',
        [RequestParameterKeys.mail.phone]: '',
        [RequestParameterKeys.mail.content]: ''
      }
    }
  },

  methods: {
    sendFeedback() {
      // TODO: Validate first.
      // this.$validator.validateall()
      //
      // if (!this.errors.any()) {
      //
      // }
      ApiConnector.sendFeedback(this.feedback)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~include-media/dist/include-media';
@import '../../style/subpages';

.subpage {
  .content-box {
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

        p,
        span,
        a {
          font-size: 1.2rem;
        }

        @include media('<desktop') {
          width: 97%;
        }

        .button {
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
        margin: 20px 2%;

        @include media('<desktop') {
          width: 97%;
        }

        h1,
        h4 {
          color: black !important;
          text-shadow: 0 0 0 white;
          font-weight: bold;
          margin: 1rem 0;
        }
      }

      .form {
        margin: 10px 2%;
        display: flex;
        width: 46%;
        flex-direction: column;
        justify-content: center;

        @include media('<desktop') {
          width: 100%;
        }

        .control {
          // For some reason margin auto does not work to center.
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }
    }
  }
}
</style>
