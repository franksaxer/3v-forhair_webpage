<template>
  <section class="section subpage">
    <h1 class="title">{{kontakt.headline}}</h1>
    <h3 class="subtitle">{{kontakt.subheadline}}</h3>
    <div class="content">
      <div class="kontaktElement">
          <i class="fa fa-phone fa-3x"></i>
          <span>{{kontakt.telefon.handy}}</span>
          <span>{{kontakt.telefon.festnetz}}</span>
      </div>
      <div class="kontaktElement">
        <i class="fa fa-envelope fa-3x"></i>
        <a :href="`mailto:${kontakt.mail.mail}`">{{kontakt.mail.mail}}</a>
      </div>
      <div class="kontaktElement">
        <i class="fa fa-location-arrow fa-3x"></i>
        <span>{{kontakt.adresse.straße}}</span>
        <span>{{kontakt.adresse.ort}}</span>
        <ul>
          <li v-for="hinweis in kontakt.adresse.hinweise">{{hinweis}}</li>
        </ul>
      </div>
      <div class="kontaktElement">
        <i class="fa fa-clock-o fa-3x"></i>
        <span v-for="tag in kontakt.öffnungszeiten.tage">{{tag}}</span>
      </div>

    </div>

    <div class="contentKontakt">
      <div class="contaktItemHeadline">
        <h1 class="title">{{kontakt.emailHeadline}}</h1>
        <h3 class="subtitle">{{kontakt.emailSubheadline}}</h3>
      </div>
      <div class="contaktItemFormular">
        <form @submit.prevent="validateBeforeSubmit">
          <div class="field">
            <div class="control">
              <input class="input" type="text" placeholder="Name">
            </div>
          </div>
          <div class="field">
            <div >
              <input class="input" type="email" placeholder="Email">
            </div>
          </div>
          <div class="field">
            <div class="control has-icons-left">
              <input class="input" type="text" placeholder="Telefonnummer">
              <span class="icon is-left">
              <span><i class="fa fa-phone"></i></span>
            </span>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <textarea class="textarea" placeholder="Nachricht"></textarea>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-primary" type="submit">Abschicken</button>
            </div>
          </div>
        </form>


      </div>
    </div>
  </section>
</template>

<script>
  import {DataStoreEntries, loadDataObject} from '../../data/DataManager'

  export default {
    name: 'kontakt',

    components: {

    },

    props: {
      name: {type: String}
    },

    data () {
      return {
        name: '',
        kontakt: {}
      }
    },

    methods: {
      validateBeforeSubmit (e) {
        this.$validator.validateAll()
        if (!this.errors.any()) {
          console.log('sendMAIL')
        }
      }
    },

    async created () {
      this.kontakt = await loadDataObject(DataStoreEntries.kontakt.key)
    }

  }

</script>

<style lang="scss" scoped>
  @import '../../../node_modules/include-media/dist/include-media';
  @import '../../style/subpages';

  .subpage{
    flex-direction: column;
    $baseColor: white;

    .title, .subtitle {
      color:$baseColor;
    }

    .content{
      border-radius: 10px;
      color: black;
      margin: 10px 2%;
      padding: 20px;
      width: auto;
      background-color: rgba( $baseColor, .7 );

      margin-bottom: 30px;

      flex-wrap: wrap;
      display: flex;
      flex-direction: row;

      .kontaktElement{
        @include media('<desktop') {
          width: 90%;
        }
        margin: 10px 2%;
        padding: 20px;
        display: flex;
        width: 46%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }

    .contentKontakt{
      border-radius: 10px;
      color: black;
      margin: 10px 2%;
      padding: 20px;
      width: auto;
      background-color: rgba( $baseColor, .7 );

      margin-bottom: 30px;

      flex-wrap: wrap;
      display: flex;

      flex-direction: row;
      .contaktItemHeadline{
        @include media('<desktop') {
          width: 90%;
        }
        margin: 10px 2%;
        padding: 20px;
        display: flex;
        width: 46%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .contaktItemFormular{
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



</style>
