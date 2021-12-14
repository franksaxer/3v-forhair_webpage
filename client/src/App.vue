<template>
  <div  id="app"
        :class="{'editable': $editable}"
        :style="[{'background-image': 'url(' + $route.meta.background +')'}]" >

    <!-- general layout with header, main and footer -->
    <section id="layout">
      <header>
        <div id="label-with-icon">
          <vue-typer text='for hair'
                     :repeat="0"
                     :pre-type-delay="1000"
                     :typeDelay="200"/>

          <img  id="logo"
                :class="{'lower-position': logoInLowerPosition}"
                @click='goHome()'
                src="./assets/icon1.png" />

          <span id="logo-spacer"
                :class="{'upper-position': !logoInLowerPosition}" />

          <vue-typer text='  [fɔːr][heər]'
                     :repeat="0"
                     :pre-type-delay="2200"
                     :typeDelay="200"/>
        </div>

        <div  id="admin-buttons"
              v-if="$editable">

          <button class="button is-primary"
                  @click="$saveData">

            <span class="icon">
              <i class="fa fa-save"></i>
            </span>
            <span>Speichern</span>
          </button>

          <button class="button is-primary"
                  @click="$build">

            <span class="icon">
              <i class="fa fa-cogs"></i>
            </span>
            <span>Bauen</span>
          </button>

          <button class="button is-primary"
                  @click="$resetData">

            <span class="icon">
              <i class="fa fa-undo"></i>
            </span>
            <span>Zurücksetzen</span>
          </button>

          <button :class="['button', 'is-primary', {'is-loading': authIsLoading}]"
                  @click="logout">

            <span class="icon">
              <i class="fa fa-sign-out"></i>
            </span>
            <span>Abmelden</span>
          </button>
        </div>
      </header>

      <main class="content">
        <main-menu :space="!logoInLowerPosition"/>
        <router-view></router-view>
      </main>

      <footer>
        <div v-if="contactData">
          <i class="fa fa-phone"></i>
          <span @click="editText(contactData.telefon, 'festnetz')" v-editable>{{ contactData.telefon.festnetz }}</span>
        </div>

        <div v-if="contactData">
          <i class="fa fa-envelope"></i>
          <span @click="editText(contactData.mail, 'mail')" v-editable>{{ contactData.mail.mail }}</span>
        </div>

        <div v-if="contactData">
          <i class="fa fa-comment"></i>
          <span @click="editText(contactData.telefon, 'mail')" v-editable>{{ contactData.telefon.handy }}</span>
        </div>

        <div>
          <i class="fa fa-calendar"></i>
          <a target="_blank" href="https://online-booking.salonbiz.com/olb/AvedaOnline?incURL=https%3a%2f%2fwww%2eterminbuch%2ede%2f3v%2dforhair" >Termin Online buchen!</a>
        </div>
      </footer>
    </section>

    <!-- login modal -->
    <div :class="['modal', {'is-active': authenticationModalOpen}]">
      <div class="modal-background"/>

      <div class="modal-card"
           v-if="authenticationModalOpen">

        <header class="modal-card-head">
          <p class="modal-card-title">Anmelden</p>
        </header>

        <section class="modal-card-body">
          <p>Bitte authentifizieren sie sich als Administrator, um in den Bearbeitunsgmodus zu gelangen.</p>

          <input class="input"
                 type="password"
                 placeholder="Passwort"
                 v-model.trim="password"
                 @keydown.enter="login">

          <p v-if="authErrorMessage"
             class="error-message">
          {{ authErrorMessage }}</p>
        </section>

        <footer class="modal-card-foot">
          <button
            :class="['button', 'is-primary', {'is-loading': authIsLoading}]"
            click="login"
          >
            Anmelden
          </button>
        </footer>
      </div>
    </div>
    <advertisement-banner />
  </div>
</template>


<script>
import MainMenu from './components/MainMenu.vue'
import AdvertisementBanner from './components/AdvertisementBanner'
import { VueTyper } from 'vue-typer'

// Import manager and utilities components.
import { DataStoreEntries, loadDataObject } from './data/DataManager'
import ApiConnector from './ApiConnector'

// Import enumerations.
import UrlEnum from './enums/UrlEnum'
import * as RouteNames from './enums/RouteNames'

export default {
  name: 'app',

  data: function() {
    return {
      // Authentication elements
      authenticationModalOpen: false, // Define if the modal should be shown.
      password: '', // Stores the password of the input element.
      authIsLoading: false, // Set the login button to loading.
      authErrorMessage: null, // Contains the error message after an invoked login try.
      contactData: null,
      logoInLowerPosition: false
    }
  },

  components: {
    'main-menu': MainMenu,
    AdvertisementBanner,
    VueTyper
  },

  methods: {
    login: async function() {
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

      this.authIsLoading = false // End loading.
    },

    logout: async function() {
      this.authIsLoading = true // Show something is happening.

      try {
        await ApiConnector.logout() // Clear the session on the server.
        this.$setEditable(false)
      } catch (err) {
        console.log(err.message)
      }

      this.authIsLoading = false // End loading.
    },

    goHome: function() {
      this.$router.push({ name: RouteNames.GREETER })
    },

    shiftLogo: function() {
      setTimeout(() => {
        if (this.$route.name === RouteNames.GREETER) {
          this.logoInLowerPosition = true
        }
      }, 5000)
    }
  },

  watch: {
    $route() {
      console.log(this.$route.name === RouteNames.GREETER)
      if (this.$route.name === RouteNames.GREETER) {
        this.shiftLogo()
      } else {
        this.logoInLowerPosition = false
      }
    }
  },

  computed: {
    /**
     * Define the font size based on the available screen height.
     * This is the anchor for much other sizes, cause they refer to it with 'em'.
     * Differ between desktop and mobile devices.
     */
    fontSize() {
      let fontSize

      // Set size relative to device type and screen size.
      if (this.$isDesktop()) {
        fontSize = window.screen.height / 80
      } else {
        fontSize = window.screen.height / 20
      }

      // Make sure stay between a range.
      const minSize = 9
      fontSize = fontSize < minSize ? minSize : fontSize

      return fontSize + 'px'
    }
  },

  async created() {
    this.shiftLogo()

    // Load data here.
    this.contactData = await loadDataObject(DataStoreEntries.kontakt.key)

    // Open authentication modal when requested.
    window.editableViewBus.$on('login', () => {
      // Open the authentication modal.
      this.authenticationModalOpen = true
    })

    // Check if the admin view is requested.
    if (window.location.pathname === UrlEnum.admin) {
      // Cause a session check from the cache which will force a login event
      // if no valid session could been restored.
      const valid = await ApiConnector.validateSession()

      // Enable the view if old session key retrieved.
      this.$setEditable(valid)
    }

    // Set root font-size for the usage of 'rem'.
    document.documentElement.style.fontSize = this.fontSize

    /*
      This is not the real root element, but some browsers suck on reading the root em.
      It helps to make to look a bit better, even if not correct.
    */
    document.body.style.fontSize = this.fontSize
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

#app {
  background-position: center center !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
}

/* The general layout with header, main and footer */
#layout {
  height: 100vh;

  $border: solid 2px rgba(0, 0, 0, 0.1);

  header {
    top: 0;
    left: 0;
    right: 0;
    height: header-height();
    z-index: 1; // Seems to be necessary, so it is not always to top element.
    display: flex;
    flexflow: row;
    justify-content: center;
    border-bottom: $border;
    background-color: $color-invert;

    #label-with-icon {
      margin-left: 65px; // Else it doesn't seem to fit correctly with the logo image.
      display: flex;
      flex-flow: row;

      .vue-typer {
        padding: 0 5px;
        color: $primary;
        font-size: calc(#{header-height()} * 0.7);
        font-weight: 500;
        font-family: 'Times New Roman', Times, serif;
      }

      #logo {
        position: fixed;
        top: 0;
        left: calc((100vw / 2) - (#{$icon-radius}) / 2);
        height: $icon-radius;
        transition: $transition;

        &.lower-position {
          top: calc(
            (100vh / 2) - (#{$icon-radius} / 2)
          ) !important; // use !important to get this work over the id.
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
          min-width: $icon-radius !important; // use !important to get this work over the id.
        }
      }
    }

    #admin-buttons {
      position: absolute;
      $margin: calc(0.15 * #{header-height()});
      top: $margin;
      right: $margin;

      button {
        height: calc(#{header-height()} - 2 * #{$margin});
      }
    }
  }

  main {
    top: header-height();
    bottom: $footer-height;
    left: 0;
    right: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    $height: calc(
      100vh - #{header-height()} - #{$footer-height}
    ); // For some unkown reasong this is necessary.
    height: $height;
    margin: 0 !important; // Overwrite bulmas content class.

    // Differ the height between mobile and desktop.
    @include media('<desktop') {
      bottom: 0; // No footer.
      height: calc(#{$height} + #{$footer-height});
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
    color: black;
    white-space: pre; // To force white spaces will not be cut.
    overflow: hidden; // Force the height, else the cover page will not work.

    $fontSize: calc(#{$footer-height} * 0.4);
    font-size: $fontSize !important;
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
  color: white !important;
}
</style>
