<template>
  <div id="app">
    <!-- general layout with header, main and footer -->
    <section class="layout">
      <header>
        <div class="nav">
          <div class="nav-left">
            <!-- necessary for the structure, else center will not work -->
          </div>

          <div class="nav-center">
            <div class="nav-item label-with-icon">
              <h1>for</h1>
              <img src="./assets/icon.png" />
              <h1>  hair</h1>
            </div>
          </div>

          <div class="nav-right">
            <!-- necessary for the structure, else center will not work -->
          </div>
        </div>
      </header>

      <main>
        <div id="content" class="main-element">

        </div>

        <advertisement-banner class="main-element" :editable="adminViewEnabled"></advertisement-banner>
      </main>

      <footer>
        <div class="nav">
          <div class="nav-center">
            <div class="nav-item">
              <i class="fa fa-phone"></i>
              <span>{{ contactData.phoneNumber }}</span>
            </div>

            <div class="nav-item">
              <i class="fa fa-envelope"></i>
              <span>{{ contactData.mailAddress }}</span>
            </div>
          </div>
        </div>
      </footer>
    </section>

    <!-- language sector -->
    <language-selector :setLanguage="setLanguage" :selectedLanguage="language"></language-selector>

    <!-- login modal -->
    <div v-if="authenticationModalOpen"
         class="modal-background">
    </div>

    <div id="authentication-modal"
         class="modal-card"
         v-if="authenticationModalOpen">

      <header class="modal-card-head">
        <p class="modal-card-title">Login</p>
      </header>

      <section class="modal-card-body">
        <p>{{ labelStore.authentication_description[language] }}</p>

        <input class="input"
               type="password"
               placeholder="Administration Password"
               v-model.trim="labelStore.authentication_passwordPlaceholder[language]"
               @keydown.enter="authenticate">

        <p v-if="authErrorMessage"
           class="error-message">

          {{authErrorMessage}}
        </p>
      </section>

      <footer class="modal-card-foot">
        <button :class="['button', 'is-primary', {'is-loading': authIsLoading}]"
                @click="authenticate">

          {{ labelStore.authentication_button[language] }}
        </button>
      </footer>
    </div>
  </div>
</template>


<script>
  // Import other components
  import LanguageSelector from './components/LanguageSelector.vue'
  import AdvertisementBanner from './components/AdvertismentBanner.vue'

  // Import manager and utilities components.
  import DataManager from './data/DataManager'
  import LabelStore from './data/LabelStore'
  import ApiConnector from './ApiConnector'

  // Import enums.
  import DataStoreEnum from './enums/DataStoreEnum'
  import UrlEnum from './enums/UrlEnum'
  import {DefaultLanguage} from './enums/LanguageEnum'

  export default {
    name: 'app',

    data: function () {
      return {
        language: DefaultLanguage, // The clients language for the labels,
        labelStore: LabelStore, // Add here, cause else it is not available for rendering.
        // Authentication elements
        authenticationModalOpen: false, // Define if the modal should be shown.
        adminViewEnabled: false, // Define if the admin view is enabled after authentication.
        password: '', // Stores the password of the input element.
        authIsLoading: false, // Set the login button to loading.
        authErrorMessage: null, // Contains the error message after an invoked login try.
        // The data objects
        contactData: DataManager.loadData(DataStoreEnum.contact)
      }
    },

    components: {
      LanguageSelector,
      'language-selector': LanguageSelector,
      'advertisement-banner': AdvertisementBanner
    },

    methods: {
      authenticate: async function () {
        try {
          this.authErrorMessage = null
          this.authIsLoading = true
          const auth = await ApiConnector.authenticate(this.password)
          this.authIsLoading = false

          if (auth) {
            this.adminViewEnabled = true
            this.authenticationModalOpen = false
          } else {
            this.authErrorMessage = this.labelStore.authentication_invalidPassword[this.language]
          }
        } catch (err) {
          this.authIsLoading = false
          this.authErrorMessage = this.labelStore.authentication_problem[this.language]
        }
      },

      setLanguage: function (language) {
        this.language = language
      }
    },

    created: async function () {
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
  .layout {
    display: flex;
    height: 100vh;
    flex-flow: column;
    overflow: hidden;


    header {
      height: $header-height;
      overflow: hidden; // Force the height, else the cover page will not work.
      z-index: 1; // Seems to be necessary, so it is not always to top element.
      background-color: $color-invert;

      .label-with-icon {
        $icon-radius: calc(#{$header-height} * 2);

        h1 {
          color: $primary;
          font-size: calc(#{$header-height * 0.7});
          font-weight: 500;
          font-family: "Times New Roman", Times, serif;
          margin: 0 calc(#{$icon-radius} / 2);
          padding-left: 10px; // Else, the "hair" is more narrow to the icon than the "for".
        }

        img {
          position: fixed;
          left: calc((100vw - #{$icon-radius}) / 2); // Auto centering doesn't work on mobile view.
          top: 5px;
          min-height: $icon-radius; // Min- is required else, the header shrink it.
        }
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
      // Only display, on non mobile devices.
      @include media('<desktop') {
        display: none;
      }

      height: $footer-height;
      overflow: hidden; // Force the height, else the cover page will not work.
      background-color: $primary-invert;
      color: white;
      white-space: pre; // To force white spaces will not be cut.
      font-size: calc(#{$footer-height} * 0.6);

      i {
        margin: auto; // Center the fa icon in relation to the span.
      }

      span {
        padding-left: 10px; // Else the icon is directly next to the text.
      }
    }
  }


  .nav {
    background-color: transparent; // Per default it is white, so background on parent elements doesn't work.
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
      right: $advertisement-width; // Stop before the advertisement on the right side.
      overflow-y: auto;

      @include media('<desktop') {
        // Use the whole width on mobile devices, cause the advertisement is missing.
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
