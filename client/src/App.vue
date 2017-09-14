<template>
  <div id="app">
    <!-- general layout with header, main and footer -->
    <section class="layout">
      <header>
      </header>

      <main>
      </main>

      <footer>
      </footer>
    </section>
  </div>
</template>


<script>
export default {
  name: 'app'
}
</script>


<style lang="scss">
  // Import 3rd party styles
  @import '../node_modules/include-media/dist/include-media';

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
    overflow: hidden;
    background: url('./assets/wallpaper.jpg');
    background-position: center left;
    background-repeat:  no-repeat;
    background-size: cover;
  }


  /* The general layout with header, main and footer */
  .layout {
    display: flex;
    min-height: 100vh;
    flex-flow: column;


    header {
      height: $header-height;
      overflow: hidden; // Force the height, else the cover page will not work.
      z-index: 1; // Seems to be necessary, so it is not always to top element.
      background-color: $color-invert;

      .title {
        color: black;
        font-size: 1.5em;
        font-weight: 500;
      }
    }

    main {
      display: flex;
      flex-flow: column;

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
    }
  }
</style>
