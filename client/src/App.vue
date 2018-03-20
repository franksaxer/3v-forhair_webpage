<template>
  <div id="app">
    <!-- general layout with header, main and footer -->
    <section id="layout">
      <header>
        <div id="label-with-icon">
          <h1>for</h1>
          <img src="./assets/icon.png" />
          <h1>  hair</h1>
        </div>

        <button id="logout-button"
                :class="['button', 'is-primary', {'is-loading': authIsLoading}]"
                v-if="adminViewEnabled"
                @click="logout">

          {{ labels.AUTH_BTN_LOGOUT | translate }}
        </button>
      </header>

      <main>
        <div id="content" class="main-element">
          <main-menu></main-menu>

        </div>

        <advertisement-banner class="main-element"></advertisement-banner>
      </main>

      <footer>
        <div>
          <i class="fa fa-phone"></i>
          <span>{{ contactData.phoneNumber }}</span>
        </div>

        <div>
          <i class="fa fa-envelope"></i>
          <span>{{ contactData.mailAddress }}</span>
        </div>
      </footer>
    </section>

    <!-- language sector -->
    <language-selector></language-selector>

    <!-- login modal -->
    <div v-if="authenticationModalOpen"
         class="modal-background">
    </div>

    <div id="authentication-modal"
         class="modal-card"
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

          {{ authErrorMessage }}
        </p>
      </section>

      <footer class="modal-card-foot">
        <button :class="['button', 'is-primary', {'is-loading': authIsLoading}]"
                @click="login">

          {{ labels.AUTH_BTN_LOGIN | translate }}
        </button>
      </footer>
    </div>
  </div>
</template>


<script>
  // Import other components
  import LanguageSelector from './components/LanguageSelector.vue'
  import AdvertisementBanner from './components/AdvertismentBanner.vue'
  import MainMenu from './components/MainMenu.vue'

  // Import manager and utilities components.
  import {DataStoreEntries, loadDataObject} from './data/DataManager'
  import ApiConnector from './ApiConnector'

  // Import enums.
  import UrlEnum from './enums/UrlEnum'

  export default {
    name: 'app',

    data: function () {
      return {
        // Authentication elements
        authenticationModalOpen: false, // Define if the modal should be shown.
        password: '', // Stores the password of the input element.
        authIsLoading: false, // Set the login button to loading.
        authErrorMessage: null, // Contains the error message after an invoked login try.
        sessionKey: null, // The session key when authorized.
        // The data objects
        contactData: {}
      }
    },

    components: {
      'language-selector': LanguageSelector,
      'advertisement-banner': AdvertisementBanner,
      'main-menu': MainMenu
    },

    methods: {
      login: async function () {
        this.authErrorMessage = null // Reset the message.
        this.authIsLoading = true // Show something is happening. Especially in case of false password.

        try {
          this.sessionKey = await ApiConnector.login(this.password) // Authenticate to the server.
          // Authentication successful.
          this.authenticationModalOpen = false // Close modal.
        } catch (err) {
          // Authentication failed.
          this.authErrorMessage = err.message
        }

        this.authIsLoading = false  // End loading.
      },

      logout: async function () {
        this.authIsLoading = true // Show something is happening.

        try {
          await ApiConnector.logout(this.sessionKey) // Clear the session on the server.
          // Logout successful.
          this.sessionKey = null
        } catch (err) {
          console.log(err.message)
        }

        this.authIsLoading = false  // End loading.
      }
    },

    computed: {
      adminViewEnabled: function () {
        if (this.sessionKey) return true
        else return false
      }
    },

    watch: {
      sessionKey: function (key) {
        if (key) {
          // Logout automatically, if the user close the window.
          // By this the user will be requested if the page rly should be closed.
          window.onbeforeunload = this.logout

          // Enable the editable view.
          this.$setEditable(true)
        } else {
          // Disable the editable view.
          this.$setEditable(false)
        }
      }
    },

    created: async function () {
      // Load lata here.
      this.contactData = await loadDataObject(DataStoreEntries.contact.key)

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
  @import '../node_modules/include-media/dist/include-media';
  @import '../node_modules/font-awesome/css/font-awesome.css';

  // Import own styles
  @import './style/3v-forhair';

  /* Bulma */
  // Import the variables first.
  @import '../node_modules/bulma/sass/utilities/initial-variables';

  // Overwrite Bulma variables.
  $primary: $color-base;
  $primary-invert: $color-invert;

  // Import Bulma classes afterwards.
  @import "../node_modules/bulma/bulma";


  body {
    margin: 0;
    overflow: hidden; // For the cover page;
    background: url('./assets/wallpaper.jpg');
    background-position: center left;
    background-repeat:  no-repeat;
    background-size: cover;
  }


  /* The general layout with header, main and footer */
  #layout {
    display: flex;
    height: 100vh;
    flex-flow: column;
    overflow: hidden;


    header {
      height: $header-height;
      //overflow: hidden; // Force the height, else the cover page will not work.
      z-index: 1; // Seems to be necessary, so it is not always to top element.
      background-color: $color-invert;
      display: flex;
      flexflow: row;
      justify-content: center;

      #label-with-icon {
        display: flex;
        flex-flow: row;

        h1 {
          color: $primary;
          font-size: calc(#{$header-height * 0.7});
          font-weight: 500;
          font-family: "Times New Roman", Times, serif;
          padding: 0 10px;
        }

        img {
          height: $icon-radius;
        }
      }

      #logout-button {
        position: absolute;
        $margin: calc(0.15 * #{$header-height});
        top: $margin;
        right: $margin;
        height: calc(#{$header-height} - 2 * #{$margin});

      }
    }

    main {
      // Differ the height between mobile and desktop.
      @include media('<desktop') {
        height: calc(100vh - #{$footer-height}); // Take the full height without the footer.
      }

      height: calc(100vh - #{$header-height} - #{$footer-height});
      overflow: auto; // Necessary if someone switch his mobile device into the horizontal view.
    }

    footer {
      display: flex;
      flex-flow: row;
      justify-content: center;

      // Only display, on non mobile devices.
      @include media('<desktop') {
        display: none;
      }

      height: $footer-height;
      overflow: hidden; // Force the height, else the cover page will not work.
      background-color: $primary-invert;
      color: white;
      white-space: pre; // To force white spaces will not be cut.

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

  main {
    .main-element {
      position: absolute;
      top: $header-height;
      bottom: $footer-height;
      overflow: hidden;

      @include media('<desktop') {
        // Ignore the footer, cause it is not displayed in this view.
        bottom: 0;
      }
    }

    #content {
      left: 0;
      overflow-y: auto;

      // Stop before the advertisement banner on the right side on desktop devices.
      @include media('>=desktop') {
        $bannerBorderLeft: var(--advertisement-banner-border-left, 300px);
        right: $bannerBorderLeft;
      }

      // Use the whole width on mobile devices, cause the advertisement is missing or can be removed.
      @include media('<desktop') {
        right: 0;
      }
    }
  }


  button {
    // The secondary color of Bulma does not rly work together.
    color: white!important;
  }


  #authentication-modal {
    $width: 400px;
    $height: 330px;

    position: absolute;
    top: calc(50vh - (#{$height} /2));
    left: calc(50vw - (#{$width} /2));

    width: $width;
    height: $height;


    .modal-card-head, .modal-card-foot {
      display: flex;
      flex-flow: column;
      justify-content: center;

      button {
        width: 150px; // To avoid resizing when loading.
      }
    }

    .modal-card-body {
      display: flex;
      flex-flow: column;
      align-items: center;

      p {
        text-align: center;
        margin-bottom: 20px; // Between this text and the input element.

        &.error-message {
          color: red!important;
        }
      }
    }
  }

</style>
