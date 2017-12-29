<template>
  <div  id="advertisement-banner"
        :class="[{'closed': closed}, {'dragging': dragging}]"
        :style="[{'background-image': 'url(' + image.source +')'}]"
        v-dragged="drag">

    <!-- Warning panel -->
    <div :class="['warn',
                 {'leftWarn': warn.left},
                 {'topWarn': warn.top}]"
          v-show="warn.left || warn.top"/>

    <!-- Button to close the banner on mobile devices -->
    <button class="close-button ghost-button"
            @click="closed = true">

      <i class="fa fa-times-circle"
         aria-hidden="true">
      </i>
    </button>

    <!-- Element group for editing the image -->
    <div class="edit-area"
         v-if="true"> <!-- do not use 'v-show' here, cause it should be rly not rendered for non admins -->

      <!-- Buttons to upload new image -->
      <div class="upload-area buttons has-addons">

        <!-- Save button to make the changes permanent -->
        <div class="save-button button">
          <i class="fa fa-floppy-o"
             aria-hidden="true"
             @click="upload">
          </i>
        </div>

        <!-- Upload Button -->
        <label class="upload-button button"
          v-if="!image.file">
          <div >
            <i class="fa fa-upload"
              aria-hidden="true">
            </i>
          </div>

          <input type="file" accept="image/*" @change="fileChange"/>
        </label>

        <!-- Remove File Button -->
        <div class="remove-button button"
          v-else>
          <i class="fa fa-times"
            aria-hidden="true"
            @click="removeFile">
          </i>
        </div>

        <!-- Show selected file name area -->
        <span class="file-view button">
          {{ fileName }}
        </span>
      </div>

      <!-- Buttons to shift the image -->
      <div class="shift-area">
        <div class="buttons has-addons desktop">
          <span class="button shift-button">
            <i class="fa fa-chevron-left"
               aria-hidden="true"
               @click="shift(-1, 0)" />
          </span>
          <span class="button shift-button">
            <i class="fa fa-chevron-right"
               aria-hidden="true"
               @click="shift(1, 0)" />
          </span>
        </div>
        <div class="buttons has-addons mobile">
          <span class="button shift-button">
            <i class="fa fa-chevron-up"
               aria-hidden="true"
               @click="shift(0, -1)" />
          </span>
          <span class="button shift-button">
            <i class="fa fa-chevron-down"
               aria-hidden="true"
               @click="shift(0, 1)" />
          </span>
        </div>

        <v-switch v-model="dragMode" :size="15" :values="['Move Image', 'Move Border']" />
      </div>
    </div>

  </div>
</template>


<script>
  import {DataStoreEntries, loadDataObject} from '../data/DataManager'
  import ApiConnector from '../ApiConnector'

  /* Components */
  import Switch from './common/Switch'

  /* Parameter */
  const cssId = 'css-advertisement-banner-background-position'
  const minBannerSize = 50

  export default {
    name: 'advertisement-banner',

    components: {
      'v-switch': Switch // Used to toggle between the image position and border adjustments.
    },

    props: {
      // Define if the banner can be adjusted by the user or not.
      // Activates the whole 'edit-area' section.
      editable: {
        type: Boolean,
        default: false // Should only be editable if it is really allowed.
      }
    },

    data () {
      return {
        // The related configuration dataset.
        config: loadDataObject(DataStoreEntries.generalConfig.key),

        // On mobile devices the banner can be closed.
        closed: false,

        image: {
          // The image file, defined if the user selected one.
          file: null,

          // The image source as URL. Per default it will be set to the servers known image.
          // Updated in reference to the .file property if the user select a new image to upload.
          source: '', // Have to get this property after created, cause earlier it is not accessable.

          // Describe the position of the image from the left upper corner.
          // Values will be overwritten by the configurations after the component has been created.
          position: {
            left: 0,
            top: 0
          },

          // Define where the border of the banner is.
          // On desktop devices, the banner is vertically, so this defines the width of the image.
          // On mobile devices, the banner is horizontally, so this defines the height of the image.
          // Values will be overwritten by the configurations after the component has been created.
          border: {
            left: 300,
            top: 150
          },

          // The original shape of the image to display.
          // Used to calculate the actual shape on display and check if position and border adjustments are acceptable.
          shape: {
            width: 0,
            height: 0
          }
        },

        // Signal that the movement of the image position or the border is not acceptable.
        // Differs in two parts, cause desktop and mobile movements always cause an exception to the over part.
        // Using 'include media' in the styles filters the relevant warning depending on the device.
        warn: {
          left: false,
          top: false
        },

        // Signals that the user is dragging. Causes CSS cursor effect.
        dragging: false,

        // Model for the switcher, if the user want to move the image position or the border.
        // True is for image, false for border.
        dragMode: true
      }
    },

    methods: {
      /**
       * Called then the user has selected an image through the file input.
       * Store the file internally, load the image file as new background
       * and reset the image position.
       *
       * @param {Array} e
       *        The file array from the input element.
       */
      fileChange (e) {
        // Get the image file from the input.
        const file = e.target.files[0]

        // Check if file exists.
        if (file) {
          // Store file to be able to upload it.
          this.image.file = file

          // Load the file as new background.
          this.loadImageFile(this)

          // Reset image position.
          this.image.position.left = 0
          this.image.position.top = 0
          this.setCssTag()
        }
      },

      /**
       * Remove the currently selected image file from the user.
       * Reset the image to the configured one.
       * Remove the internally stored image file for the upload.
       * Reset the image position from the configurations.
       */
      removeFile () {
        // Reload the original image.
        this.image.source = this.config.advertisementImage

        // Remove the selected file.
        this.image.file = null

        // Reset the image position.
        // TODO: Get real position.
        this.image.position.left = 0
        this.image.position.top = 0
      },

      /**
       * Method to set the shape properties of the image in the data object.
       * Load the image source as Image object and extract the shape properties.
       * Used for the configured images as well for a new selected one.
       *
       * @param {Object} context
       *        Provide the Vue components 'this' context as argument,
       *        so it is available in the 'onload' function of the Image object.
       */
      setImageShape (context) {
        const img = new Image()

        img.onload = function () {
          // Extract the shape properties.
          context.image.shape.width = this.width
          context.image.shape.height = this.height
        }

        img.src = context.image.source
      },

      /**
       * Load a given image file (selected by the user) to get it as an URL.
       * The URL will be used for the image source property, that defines the displayed image.
       * Use the FileReader object to do so.
       *
       * @param {Object} context
       *        Provide the Vue components 'this' context as argument,
       *        so it is available in the 'onloadend' function of the FileReader object.
       */
      loadImageFile (context) {
        const reader = new FileReader()

        reader.onloadend = function () {
          // Set the file URL as image source.
          context.image.source = reader.result

          // Reset the image shapes for the new file.
          context.setImageShape(context)
        }

        reader.readAsDataURL(context.image.file)
      },

      /**
       * Make the changes to the image file, image position and the border persistent.
       * Use the ApiConnector to do so.
       * Upload the image file and adust the configurations for the other properties.
       * Perform a 'save' operation in the end to build the client new on the server.
       */
      upload: async function () {
        await ApiConnector.upload('advertisement/aveda-example.png', this.image.file)
        // TODO: Adjust the configurations
        await ApiConnector.save()
      },

      /**
       * Called if the user drag the image.
       * Simply signals the dragging action with the responsible property, that cause a CSS cursor style change.
       * Call the shift method with the delta values of the x- and y-axis due to the mouse movement.
       *
       * @param {Object} dragOptions
       *        Complex object defined by the 'v-dragged' module.
       */
      drag ({el, deltaX, deltaY, offsetX, offsetY, clientX, clientY, first, last}) {
      // Set dragging variable to adjust the cursor style based on the additional class.
        if (first) {
          this.dragging = true
        } else if (last) {
          this.dragging = false
        } else {
          // Call the actual shift method.
          this.shift(deltaX, deltaY)
        }
      },

      /**
       * Call by a dragging action or clicks on the shift buttons.
       * Differ by the drag mode if the image position or the border should been shifted.
       *
       * @param {Number} xOffset
       *        The offset in the x-axis to shift.
       *
       * @param {Number} yOffset
       *        The offset in the y-axis to shift.
       */
      shift (xOffset, yOffset) {
        // Select the correct shift method by the currently active drag mode property.
        if (this.dragMode) {
          this.shiftImage(xOffset, yOffset)
        } else {
          // Mind that the border shifts the other way around.
          this.shiftBorder(xOffset * -1, yOffset * -16404)
        }
      },

      /**
       * Shift the image position refered to the left upper corner.
       * Make sure the image always fits into the banner after the shift has been performed.
       * By this it forbits shift it away from the active border
       * or shift it away from the window edge subtend to the border.
       * Have to compare the current image shape, depending on the stretch, to the banners shape.
       * Make the changes visible if the shift motion was acceptable.
       * Activate the warn signal if not so.
       * For the currently active device type not relevant warning are hided automatically by the style definitions.
       *
       * @param {Number} xOffset
       *        The offset in the x-axis to shift.
       *
       * @param {Number} yOffset
       *        The offset in the y-axis to shift.
       */
      shiftImage (xOffset, yOffset) {
        // Get theoretically new positions.
        let newLeftPosition = this.image.position.left + xOffset
        let newTopPosition = this.image.position.top + yOffset

        // Get the shape of the image in relation to the current full sized parameter

        // Only set the new horizontal position if it is not sifted away from the right or left border.
        if (newLeftPosition <= 0 && (newLeftPosition + this.relativeImageWidth) > this.bannerWidth) {
          this.image.position.left = newLeftPosition
        } else {
          // Show warning to user.
          this.blinkShiftWarn(true, false)
        }

        // Only set the new vertical position if it is not sifted away from the top or bottom border.
        if (newTopPosition <= 0 && (newTopPosition + this.relativeImageHeight) > this.bannerHeight) {
          this.image.position.top = newTopPosition
        } else {
          // Show warning to user.
          this.blinkShiftWarn(false, true)
        }

        // Update the position.
        this.setCssTag()
      },

      /**
       * Shift the border of the banner.
       * The active border depends on the current active device.
       * For desktop devices, the border is on the left of the vertical banner on the right window edge.
       * For mobile devices, the border is on the top of the banner on the bottom window edge.
       * Make sure the border can not been shifted farther than the image is width or height (device depending).
       * Make sure a minimal image pane is visible and the border can not be moved over the window edge.
       * Make the changes visible if the shift motion was acceptable.
       * Activate the warn signal if not so.
       * For the currently active device type not relevant warning are hided automatically by the style definitions.
       *
       * @param {Number} xOffset
       *        The offset in the x-axis to shift.
       *
       * @param {Number} yOffset
       *        The offset in the y-axis to shift.
       */
      shiftBorder (xOffset, yOffset) {
        const newLeftBorder = this.image.border.left + xOffset
        const newTopBorder = this.image.border.top + yOffset

        // Only set the new vertical border if it is not larger than the images width or negative.
        if (newLeftBorder > minBannerSize && newLeftBorder <= this.relativeImageWidth) {
          this.image.border.left = newLeftBorder
        } else {
          // Show warning to user.
          this.blinkShiftWarn(true, false)
        }

        // Only set the new horizontal border if it is not larger than the images height or negative.
        if (newTopBorder > minBannerSize && newTopBorder <= this.relativeImageHeight) {
          this.image.border.top = newTopBorder
        } else {
          // Show warning to user.
          this.blinkShiftWarn(false, true)
        }

        this.setCssTag()
      },

      /**
       * Called when the user has performed an invalid shift movement.
       * Set the warn signal for a short period.
       * Cause an CSS effect, visible by the user.
       * Differ between warnings for desktop and mobile devices.
       *
       * @param {Boolean} leftWarn
       *        Warning, that the shift motion was not acceptable due to the left border.
       *        Only visible on desktop devices.
       *
       * @param {Boolean} topWarn
       *        Warning, that the shift motion was not acceptable due to the top border.
       *        Only visible on mobile devices.
       */
      blinkShiftWarn (leftWarn, topWarn) {
        // Show the warning element for a short time.
        this.warn.left = leftWarn
        this.warn.top = topWarn

        setTimeout(() => {
          this.warn.left = false
          this.warn.top = false
        }, 100)
      },

      /**
       * Replace the created CSS tag in the style sheet with the current properties.
       * The tag itself has been already created in the 'created' method of the component.
       * The actual content will be defined by a computed value.
       */
      setCssTag () {
        // Update the CSS tag with the background variables.
        document.getElementById(cssId).innerHTML = this.cssTag
      }
    },

    computed: {
      // Display name of the users selected file. Request to select a file, if have not.
      fileName () {
        // Show request to select a file.
        if (!this.image.file) return 'Upload Image'

        // Show the name property of the selected file.
        else return this.image.file.name
      },

      // The width of the image relative to the stretched height on desktop devices.
      relativeImageWidth () {
        return this.bannerHeight / this.image.shape.height * this.image.shape.width
      },

      // The height of the image relative to the stretched width on mobile devices.
      relativeImageHeight () {
        return this.bannerWidth / this.image.shape.width * this.image.shape.height
      },

      // The actual width of the banner in the window.
      bannerWidth () {
        return document.getElementById('advertisement-banner').offsetWidth
      },

      // The actual height of the banner in the window.
      bannerHeight () {
        return document.getElementById('advertisement-banner').offsetHeight
      },

      // Composition of the CSS tag by the responsible property values.
      cssTag () {
        return '#advertisement-banner {' +
                 '--advertisement-banner-background-position-left: ' + this.image.position.left + 'px; ' +
                 '--advertisement-banner-background-position-top: ' + this.image.position.top + 'px; ' +
                 '--advertisement-banner-border-left: ' + this.image.border.left + 'px; ' +
                 '--advertisement-banner-border-top: ' + this.image.border.top + 'px; ' +
               '}'
      }
    },

    created: function () {
      // Set the image source by the configuration, that is accessable now.
      this.image.source = this.config.advertisementImage

      // Initial set the image shape.
      this.setImageShape(this)

      // Add CSS variable to define the background image position.
      const css = document.createElement('style')
      css.id = cssId
      css.type = 'text/css'
      css.innerHTML = this.cssTag
      document.body.insertBefore(css, document.body.firstChild)
    }
  }
</script>


<style lang="scss" scoped>
  // Import 3rd party styles
  @import '../../node_modules/include-media/dist/include-media';
  @import '../../node_modules/font-awesome/css/font-awesome.css';
  @import "../../node_modules/bulma/bulma";

  // Import own styles
  @import '../style/3v-forhair';


  // Define some variables.
  $buttonSize: 31px;
  $buttonFontSize: calc(0.6 * #{$buttonSize});
  $shift-buttonSize: 14px;
  $shift-buttonFontSize: calc(0.8 * #{$shift-buttonSize});

  // Load CSS variables set by the component.
  $backgroundPosition_left: var(--advertisement-banner-background-position-left, 0px);
  $backgroundPosition_top: var(--advertisement-banner-background-position-top, 0px);
  $borderLeft: var(--advertisement-banner-border-left, 300px);
  $borderTop: var(--advertisement-banner-border-top, 300px);


  #advertisement-banner {
    // Hide banner on mobile devices when this class has been added.
    &.closed {
      @include media('<desktop') {
        display: none;
      }
    }


    /* Shapes */
    right: 0;

    // Vertical banner on the right edge for desktop devices.
    @include media('>=desktop') {
      left: calc(100vw - #{$borderLeft});
      top: $header-height;
      bottom: $footer-height;
    }

    // Horizontal banner on the bottom edge for mobile devices.
    @include media('<desktop') {
      left: 0;
      top: calc(100vh - #{$borderTop});
      bottom: 0;
    }


    /* Background */
    background-repeat:  no-repeat;

    // Priorize height on desktop devices.
    @include media('>=desktop') {
      background-size: auto 100%;
      background-position: $backgroundPosition_left 0; // Only set the left position, defined by the configurations.
    }

    // Priorize width on mobile devices.
    @include media('<desktop') {
      background-size: 100% auto;
      background-position: 0 $backgroundPosition_top; // Only set the top position, defined by the configuration

    }


    /* Cursor */
    cursor: grab;

    // Dragg effect when user drag.
    &.dragging {
      cursor: grabbing;
    }


    /* Manuel devide indicators */
    .desktop {
      @include media('<desktop') {
        display: none;
      }
    }

    .mobile {
      @include media('>=desktop') {
        display: none;
      }
    }


    /* Buttons */
    .button {
      font-size: $buttonFontSize;

      &.shift-button {
        font-size: $shift-buttonFontSize!important;
      }
    }

    .close-button {
      /* Variables */
      $margin: 5px;

      /* Position and Shape */
      position: absolute;
      top: $margin;
      right: $margin;

      /* Effects */
      &:hover {
        color: gray;
      }
    }

    .close-button {
      @include media('>=desktop') {
        // Should be only removable on mobile devices.
        display: none;
      }
    }


    /* Warn Signal */
    .warn {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
      background-color: rgba(255, 0, 0, 0.3);

      &.leftwarn {
        @include media('<desktop') {
          display: none;
        }
      }

      &.topwarn {
        @include media('>=desktop') {
          display: none;
        }
      }
    }

    .edit-area {

      // All direct childs.
      > * {
        margin-bottom: 2px;
      }

      .button {
        width: $buttonSize;
        margin: 0;
      }

      .upload-area {
        display: flex;
        flex-flow: row;

        .button {
          height: $buttonSize;
        }

        input[type='file'] {
          display: none;
        }

        .file-view {
          display: flex;
          justify-content: flex-start;
          $width: calc(100vw - 2 * #{$buttonSize});
          width: $width!important;
          overflow: hidden;
          padding-left: 5px;
          font-size: calc(0.7 * #{$buttonFontSize})
        }
      }

      .shift-area {
        display: flex;
        flex-flow: row;

        .button {
          height: $shift-buttonSize;
        }
      }
    }
  }
</style>
