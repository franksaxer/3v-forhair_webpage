<template>
  <section class="section subpage">
    <h1 class="title">{{kontakt.headline}}</h1>
    <h2 class="subtitle">{{kontakt.subheadline}}</h2>
    <div class="content content-box">
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
        <a target="_blank" href="https://www.google.de/maps/dir/52.5335437,13.3441854/3v+for+hair,+Rankestra%C3%9Fe+24,+10789+Berlin/@52.5187527,13.3264526,14z/data=!3m1!4b1!4m16!1m6!3m5!1s0x47a850f8c68c9039:0x2768ef6840eb28e8!2s3v+for+hair!8m2!3d52.5017623!4d13.3332985!4m8!1m1!4e1!1m5!1m1!1s0x47a850f8c68c9039:0x2768ef6840eb28e8!2m2!1d13.3332985!2d52.5017623" class="button is-outlined is-link">Route</a>
        <ul>
          <span v-for="hinweis in kontakt.adresse.hinweise">{{hinweis}}</span>
        </ul>
      </div>
      <div class="kontaktElement">
        <i class="fa fa-clock-o fa-3x"></i>
        <span v-for="tag in kontakt.öffnungszeiten.tage">{{tag}}</span>
      </div>
    </div>

    <hr>

    <div class="content-box ">
      <div class="contaktItemHeadline">
        <h1>{{kontakt.emailHeadline}}</h1>
        <h3>{{kontakt.emailSubheadline}}</h3>
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

    h2{
      font-weight: bold;
      font-style: italic;
    }

    .content-box{
      margin: 10px 2%;
      width: auto;


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

        .button{
          margin: 10px;
        }

      }

      .contaktItemHeadline{



        h1,h3{
          color:black!important;
          text-shadow: 0 0 0 white;
        }
        text-align: center;
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
