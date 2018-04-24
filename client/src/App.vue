<template>
  <div  id="app"
        :class="{'editable': $editable}"
        :style="[{'background-image': 'url(' + $route.meta.background +')'}]" >

    <!-- general layout with header, main and footer -->
    <section id="layout">
      <header>
        <div id="label-with-icon">
          <vue-typer text='for'
                     :repeat="0"
                     :pre-type-delay="1000"
                     :typeDelay="200"/>

          <img  id="logo"
                :class="{'lower-position': logoInLowerPosition}"
                @click='goHome()'
                src="./assets/icon.png" />

          <span id="logo-spacer"
                :class="{'upper-position': !logoInLowerPosition}" />

          <vue-typer text='hair'
                     :repeat="0"
                     :pre-type-delay="2200"
                     :typeDelay="200"/>
        </div>

        <div  id="admin-buttons"
              v-if="$editable">

          <button :class="['button', 'is-primary', {'is-loading': $saving}]"
                  @click="$saveData">

            {{ labels.AUTH_BTN_SAVE | translate }}
          </button>

          <button :class="['button', 'is-primary']"
                  @click="$resetData">

            {{ labels.AUTH_BTN_RESET | translate }}
          </button>

          <button :class="['button', 'is-primary', {'is-loading': authIsLoading}]"
                  @click="logout">

            {{ labels.AUTH_BTN_LOGOUT | translate }}
          </button>
        </div>
      </header>

      <main class="content">
        <main-menu :space="!logoInLowerPosition"/>
        <router-view></router-view>
      </main>

      <footer>
        <div>
          <i class="fa fa-phone"></i>
          <span @click="editText(contactData.telefon, 'festnetz')" v-editable>{{ contactData.telefon.festnetz }}</span>
        </div>

        <div>
          <i class="fa fa-envelope"></i>
          <span @click="editText(contactData.mail, 'mail')" v-editable>{{ contactData.mail.mail }}</span>
        </div>
      </footer>
    </section>

    <!-- language sector -->
    <language-selector></language-selector>

    <!-- login modal -->
    <div :class="['modal', {'is-active': authenticationModalOpen}]">
      <div class="modal-background"/>

      <div class="modal-card"
           v-if="authenticationModalOpen">

        <header class="modal-card-head">
          <p class="modal-card-title">
            {{ labels.AUTH_BTN_LOGIN | translate }}
          </p>
        </header>

        <section class="modal-card-body">
          <p>{{ labels.AUTH_MSG_DESCRIPTION | translate }}</p>

          <input class="input"
                 type="password"
                 :placeholder="labels.AUTH_INPUT_PH_PWD | translate"
                 v-model.trim="password"
                 @keydown.enter="login">

          <p v-if="authErrorMessage"
             class="error-message">
          {{ authErrorMessage }}</p>
        </section>

        <footer class="modal-card-foot">
          <button :class="['button', 'is-primary', {'is-loading': authIsLoading}]"
                  @click="login">

            {{ labels.AUTH_BTN_LOGIN | translate }}
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>


<script>
  // Import other components
  import LanguageSelector from './components/LanguageSelector.vue'
  import AdvertisementBanner from './components/AdvertismentBanner.vue'
  import MainMenu from './components/MainMenu.vue'
  import { VueTyper } from 'vue-typer'

  // Import manager and utilities components.
  import {DataStoreEntries, loadDataObject} from './data/DataManager'
  import ApiConnector from './ApiConnector'

  // Import enumerations.
  import UrlEnum from './enums/UrlEnum'
  import * as RouteNames from './enums/RouteNames'

  export default {
    name: 'app',

    data: function () {
      return {
        // Authentication elements
        authenticationModalOpen: false, // Define if the modal should be shown.
        password: '', // Stores the password of the input element.
        authIsLoading: false, // Set the login button to loading.
        authErrorMessage: null, // Contains the error message after an invoked login try.
        // The data objects
        contactData: {
          telefon: {},
          mail: {}
        }
      }
    },

    components: {
      'language-selector': LanguageSelector,
      'advertisement-banner': AdvertisementBanner,
      'main-menu': MainMenu,
      VueTyper
    },

    methods: {
      login: async function () {
        this.authErrorMessage = null // Reset the message.
        this.authIsLoading = true // Show something is happening. Especially in case of false password.

        try {
          await ApiConnector.login(this.password) // Authenticate to the server.
          this.$setEditable()
          this.authenticationModalOpen = false // Close modal.
        } catch (err) {
          // Authentication failed.
          console.log('fehler: ' + JSON.stringify(err.message))
          this.authErrorMessage = err.message
        }

        this.authIsLoading = false  // End loading.
      },

      logout: async function () {
        this.authIsLoading = true // Show something is happening.

        try {
          await ApiConnector.logout() // Clear the session on the server.
          this.$setEditable(false)
        } catch (err) {
          console.log(err.message)
        }

        this.authIsLoading = false  // End loading.
      },

      goHome: function () {
        this.$router.push({name: RouteNames.GREETER})
      }
    },

    computed: {
      logoInLowerPosition: function () {
        return this.$route.name === RouteNames.GREETER
      }
    },

    async created () {
      // Load lata here.
      this.contactData = await loadDataObject(DataStoreEntries.kontakt.key)
      this.subpages = await loadDataObject(DataStoreEntries.mainMenu.key)

      // Check if the admin view is requested.
      if (window.location.pathname === UrlEnum.admin) {
        // Open the authentication modal.
        this.authenticationModalOpen = true
      }
    }
  }
</script>


<style lang="scss">
  // Import 3rd party styles
  @import '~include-media/dist/include-media';
  @import '~font-awesome/css/font-awesome.css';

  // Import own styles
  @import './style/3v-forhair';


  body {
    margin: 0;
    overflow: hidden; // For the cover page;
  }

  #app{
    background-position: center center!important;
    background-repeat:  no-repeat!important;
    background-size: cover!important;
  }


  /* The general layout with header, main and footer */
  #layout {
    height: 100vh;

    $border: solid 2px rgba(0,0,0,0.1);

    header {
      top: 0;
      left: 0;
      right: 0;
      height: $header-height;
      z-index: 1; // Seems to be necessary, so it is not always to top element.
      display: flex;
      flexflow: row;
      justify-content: center;
      border-bottom: $border;
      background-color: $color-invert;

      #label-with-icon {
        margin-left: 13px; // Else it doesn't seem to fit correctly with the logo image.
        display: flex;
        flex-flow: row;

        .vue-typer {
          padding: 0 5px;
          color: $primary;
          font-size: calc(#{$header-height * 0.7});
          font-weight: 500;
          font-family: "Times New Roman", Times, serif;
        }

        #logo {
          position: fixed;
          top: 0;
          left: calc((100vw / 2) - (#{$icon-radius}) / 2);
          height: $icon-radius;
          transition: $transition;

          &.lower-position {
            top: calc((100vh / 2) - (#{$icon-radius} / 2))!important; // use !important to get this work over the id.
          }

          // Show the user that this is clickable.
          &:hover {
            cursor: pointer;
            transform: scale3d(1.2, 1.2, 1.2);
          }
        }

        #logo-spacer {
          min-width: 0;
          transition: $transition;

          &.upper-position {
            min-width: $icon-radius!important; // use !important to get this work over the id.
          }
        }
      }

      #admin-buttons {
        position: absolute;
        $margin: calc(0.15 * #{$header-height});
        top: $margin;
        right: $margin;

        button {
          height: calc(#{$header-height} - 2 * #{$margin});
        }
      }
    }

    main {
      top: $header-height;
      bottom: $footer-height;
      left: 0;
      right: 0;
      overflow-x: hidden;
      overflow-y: scroll;
      height: calc(100vh - #{$header-height} - #{$footer-height}); // For some unkown reasong this is necessary.
      margin: 0!important; // Overwrite bulmas content class.

      // Differ the height between mobile and desktop.
      @include media('<desktop') {
        bottom: 0; // No footer.
      }
    }

    footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      flex-flow: row;
      justify-content: center;

      border-top: $border;

      // Only display, on non mobile devices.
      @include media('<desktop') {
        display: none;
      }

      height: $footer-height;
      background-color: $primary-invert;
      color: white;
      text-shadow: decentShadow(black);
      white-space: pre; // To force white spaces will not be cut.
      overflow: hidden; // Force the height, else the cover page will not work.

      $fontSize: calc(#{$footer-height} * 0.4);
      font-size: $fontSize!important;
      line-height: $fontSize; // Else the text has space above.

      // All direct childs
      > * {
        $top: calc((#{$footer-height} - #{$fontSize}) / 2);
        margin: $top 10px;
        padding: 0;
      }

      span {
        padding-left: 5px; // Else the icon is directly next to the text.
      }
    }
  }

  button {
    // The secondary color of Bulma does not rly work together.
    color: white!important;
  }
</style>
