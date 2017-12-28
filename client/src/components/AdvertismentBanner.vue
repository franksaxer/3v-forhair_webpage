erem<template>
  <div  id="advertisement-banner"
        :class="[{'closed': closed}, {'dragging': dragging}]"
        :style="[{'background-image': 'url(' + image.source +')'}]"
        v-dragged="dragImage">

    <!-- Warning panel -->
    <div :class="['warn',
                 {'leftWarn': warn.left},
                 {'topWarn': warn.top}]"
          v-if="warn.left || warn.top"/>

    <!-- Button to close the banner on mobile devices -->
    <button class="close-button ghost-button"
            @click="closed = true">

      <i class="fa fa-times-circle"
         aria-hidden="true">
      </i>
    </button>

    <!-- Element group for editing the image -->
    <div class="edit-area"
      v-if="true">

      <!-- Buttons to upload new image -->
      <div class="upload-area">

        <!-- File to upload selection -->
        <div class="buttons has-addons">

          <!-- Save button to make the changes permanent -->
          <div class="save-button button">
            <i class="fa fa-floppy-o"
               aria-hidden="true"
               @click="execute">
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
          <span class="file-view button"
            v-if="image.file">
            {{ fileName }}
          </span>
        </div>
      </div>

      <!-- Buttons to shift the image -->
      <div class="shift-area buttons has-addons">
        <span class="button desktop">
          <i class="fa fa-chevron-left"
             aria-hidden="true"
             @click="shiftImage(-1, 0)" />
        </span>
        <span class="button desktop">
          <i class="fa fa-chevron-right"
             aria-hidden="true"
             @click="shiftImage(1, 0)" />
        </span>
        <span class="button mobile">
          <i class="fa fa-chevron-up"
             aria-hidden="true"
             @click="shiftImage(0, -1)" />
        </span>
        <span class="button mobile">
          <i class="fa fa-chevron-down"
             aria-hidden="true"
             @click="shiftImage(0, 1)" />
        </span>
      </div>

    </div>

  </div>
</template>


<script>
  import {DataStoreEntries, loadDataObject} from '../data/DataManager'
  import ApiConnector from '../ApiConnector'

  /* Parameter */
  const cssId = 'css-advertisement-banner-background-position'

  export default {
    name: 'advertisement-banner',

    props: {
      editable: {
        type: Boolean,
        default: false // Should only be editable if it is really allowed.
      }
    },

    data: function () {
      return {
        config: loadDataObject(DataStoreEntries.generalConfig.key),
        closed: false,
        image: {
          file: null,
          source: '', // Have to get this property after created, cause earlier it is not accessable.
          position: {
            left: 0,
            top: 0
          },
          shape: {
            width: 0,
            height: 0
          }
        },
        dragging: true,
        warn: {
          left: false,
          top: false
        }
      }
    },

    methods: {
      fileChange: function (e) {
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
          this.setBackgroundPosition()
        }
      },

      removeFile: function () {
        // Reload the original image.
        this.image.source = this.config.advertisementImage

        // Remove the selected file.
        this.image.file = null

        // Reset the image position.
        // TODO: Get real position.
        this.image.position.left = 0
        this.image.position.top = 0
      },

      // Use 'this' as argument 'context', so it is available in the 'onload' function.
      setImageShape: function (context) {
        const img = new Image()

        img.onload = function () {
          // Extract the shape properties.
          context.image.shape.width = this.width
          context.image.shape.height = this.height
        }

        img.src = context.image.source
      },

      // Use 'this' as argument 'context', so it is available in the 'onloaded' function.
      loadImageFile: function (context) {
        const reader = new FileReader()

        reader.onloadend = function () {
          // Set the file URL as image source.
          context.image.source = reader.result

          // Reset the image shapes for the new file.
          context.setImageShape(context)
        }

        reader.readAsDataURL(context.image.file)
      },

      execute: async function () {
        await ApiConnector.upload('advertisement/aveda-example.png', this.image.file)
        await ApiConnector.save()
      },

      dragImage: function ({el, deltaX, deltaY, offsetX, offsetY, clientX, clientY, first, last}) {
        // Set dragging variable to adjust the cursor style based on the additional class.
        if (first) {
          this.dragging = true
        } else if (last) {
          this.dragging = false
        } else {
          this.shiftImage(deltaX, deltaY)
        }
      },

      shiftImage: function (xOffset, yOffset) {
        // Get theoretically new positions.
        let xNew = this.image.position.left + xOffset
        let yNew = this.image.position.top + yOffset

        // Get the shape of the image in relation to the current full sized parameter
        const width = (this.bannerHeight / this.image.shape.height) * this.image.shape.width
        const height = (this.bannerWidth / this.image.shape.width) * this.image.shape.height

        // Only set the new horizontal position if it is not sifted away from the right or left border.
        if (xNew <= 0 && (xNew + width) > this.bannerWidth) {
          this.image.position.left = xNew
        } else {
          // Show warning to user.
          this.blinkShiftWarn(true, false)
        }

        // Only set the new vertical position if it is not sifted away from the top or bottom border.
        if (yNew <= 0 && (yNew + height) > this.bannerHeight) {
          this.image.position.top = yNew
        } else {
          // Show warning to user.
          this.blinkShiftWarn(false, true)
        }

        // Update the position.
        this.setBackgroundPosition()
      },

      blinkShiftWarn: function (leftWarn, topWarn) {
        // Show the warning element for a short time.
        this.warn.left = leftWarn
        this.warn.top = topWarn

        setTimeout(() => {
          this.warn.left = false
          this.warn.top = false
        }, 100)
      },

      setBackgroundPosition: function () {
        // Update the CSS tag with the background position variables.
        document.getElementById(cssId).innerHTML = this.backgroundPosition_tag
      }
    },

    computed: {
      fileName: function () {
        if (!this.image.file) return ''
        else return this.image.file.name
      },

      bannerWidth: function () {
        return document.getElementById('advertisement-banner').offsetWidth
      },

      bannerHeight: function () {
        return document.getElementById('advertisement-banner').offsetHeight
      },

      backgroundPosition_tag: function () {
        // Build a CSS term for this component, including two CSS variables for the background position.
        return '#advertisement-banner { --advertisement-banner-background-position-left: ' + this.image.position.left + 'px; --advertisement-banner-background-position-top: ' + this.image.position.top + 'px; }'
      }
    },

    created: async function () {
      // Set the image source by the configuration, that is accessable now.
      this.image.source = this.config.advertisementImage

      // Initial set the image shape.
      this.setImageShape(this)

      // Add CSS variable to define the background image position.
      const css = document.createElement('style')
      css.id = cssId
      css.type = 'text/css'
      css.innerHTML = this.backgroundPosition_tag
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
  $banner-height: 25vh;

  // Load CSS variables set by the component.
  $backgroundPosition_left: var(--advertisement-banner-background-position-left, 0px);
  $backgroundPosition_top: var(--advertisement-banner-background-position-top, 0px);


  #advertisement-banner {
    /* Shapes */
    left: calc(100% - #{$advertisement-width});
    right: 0;
    // Inherit the top and bottom properties from the upper component.

    // Warning when try to shift image over the left or right border.
    .warn {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
      background-color: rgba(255, 0, 0, 0.3);

      &.leftWarn {
        @include media('<desktop') {
          display: none;
        }
      }

      &.topWarn {
        @include media('>=desktop') {
          display: none;
        }
      }
    }

    /* Cursor */
    cursor: grab;

    &.dragging {
      cursor: grabbing;
    }


    /* Background */
    background-repeat:  no-repeat;
    background-size: auto 100%;
    background-position: $backgroundPosition_left 0; // Only set the left position, defined by the configurations.


    /* Mobile Properties */
    @include media('<desktop') {
      /* Shapes */
      left: 0;
      top: calc(100vh - #{$banner-height});
      right: 0;
      bottom: 0;

      background-size: 100% auto;
      background-position: 0 $backgroundPosition_top; // Only set the top position, defined by the configuration

      &.closed {
        display: none;
      }
    }


    /* Close & Edit Button */
    button {
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

    .edit-area {
      $square: 31px;

      > * {
        margin-bottom: 2px;
      }

      .button {
        width: $square;
      }

      .upload-area {
        display: flex;
        flex-flow: row;

        .button {
          height: $square;
        }

        input[type='file'] {
          display: none;
        }

        .file-view {
          display: flex;
          justify-content: flex-start;
          $leftPadding: 5px;
          $width: calc(100% - 2 * #{$square} - #{$leftPadding});
          width: $width!important;
          overflow: hidden;
          padding-left: $leftPadding;
        }
      }

      .shift-area {
        .button {
          height: calc(#{$square} * (3/5));

          &.desktop {
            @include media('<desktop') {
              display: none;
            }
          }

          &.mobile {
            @include media('>=desktop') {
              display: none;
            }
          }
        }
      }
    }
  }
</style>
