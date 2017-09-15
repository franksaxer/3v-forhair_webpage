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

        <advertisement-banner class="main-element"></advertisement-banner>
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
  </div>
</template>


<script>
  // Import other components
  import AdvertisementBanner from './components/AdvertismentBanner.vue'

  // Import data and configurations
  import ContactData from './data/ContactData'

  export default {
    name: 'app',

    data: function () {
      return {
        contactData: ContactData
      }
    },

    components: {
      'advertisement-banner': AdvertisementBanner
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

</style>
