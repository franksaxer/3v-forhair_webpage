<template>
  <div  id="advertisement-banner"
        :class="[{'closed': closed}, {'dragging': dragging}]"
        :style="[{'background-image': 'url(' + image.source +')'},
                 {'background-position': background_position}]"
        v-dragged="dragImage">

    <div class="warn"
         v-if="shiftWarn"/>

    <!-- Button to close the banner on mobile devices -->
    <button class="close-button ghost-button"
            @click="closed = true">

      <i class="fa fa-times-circle"
         aria-hidden="true">
      </i>
    </button>

    <!-- Element group for editing the image -->
    <div class="edit-area"
      v-if="editable">

      <!-- Buttons to upload new image -->
      <div class="upload-area">

        <!-- File to upload selection -->
        <div class="buttons has-addons">
          <label class="upload-button button">
            <div >
              <i class="fa fa-upload"
                aria-hidden="true">
              </i>
            </div>

            <input type="file" @change="fileChange"/>
          </label>

          <!-- Save button to make the changes permanent -->
          <div class="save-button button">
            <i class="fa fa-floppy-o"
              aria-hidden="true"
              @click="execute">
            </i>
          </div>

          <!-- Show selected file name area -->
          <span class="file-view button"
            v-if="mediaFile">
            {{ fileName }}
          </span>
        </div>
      </div>

      <!-- Buttons to shift the image -->
      <div class="shift-area buttons has-addons">
        <span class="button">
          <i class="fa fa-chevron-left"
             aria-hidden="true"
             @click="shiftImage(-1)" />
        </span>
        <span class="button">
          <i class="fa fa-chevron-right"
             aria-hidden="true"
             @click="shiftImage(1)" />
        </span>
      </div>

    </div>

  </div>
</template>


<script>
  import {DataStoreEntries, loadDataObject} from '../data/DataManager'
  import ApiConnector from '../ApiConnector'

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
        closed: false,
        image: {
          source: loadDataObject(DataStoreEntries.generalConfig.key).advertisementImage,
          position: 0,
          size: {
            width: 0,
            height: 0
          }
        },
        mediaFile: null,
        dragging: true,
        shiftWarn: false
      }
    },

    methods: {
      fileChange: function (e) {
        this.mediaFile = e.target.files[0]
        console.log(this.mediaFile)
      },

      execute: async function () {
        await ApiConnector.upload('advertisement/aveda-example.png', this.mediaFile)
        await ApiConnector.save()
      },

      dragImage: function ({el, deltaX, deltaY, offsetX, offsetY, clientX, clientY, first, last}) {
        // Set dragging variable to adjust the cursor style based on the additional class.
        if (first) {
          this.dragging = true
        } else if (last) {
          this.dragging = false
        } else {
          this.shiftImage(deltaX)
        }
      },

      shiftImage: function (offset) {
        // Get theoretically new position.
        let newPos = this.image.position + offset

        // Get the width of the image in realtion to the current height.
        const width = (this.bannerWidth / this.image.size.height) * this.image.size.width

        // Only set the new position if it is not sifted away from the right or left border.
        if (newPos <= 0 && (newPos + width) > this.bannerWidth) {
          this.image.position = newPos
        } else {
          // Show warning to user.
          this.blinkShiftWarn()
        }
      },

      blinkShiftWarn: function () {
        // Show the warning element for a short time.
        this.shiftWarn = true
        setTimeout(() => { this.shiftWarn = false }, 100)
      }
    },

    computed: {
      fileName: function () {
        if (!this.mediaFile) return ''
        else return this.mediaFile.name
      },

      background_position: function () {
        return this.image.position + 'px 0'
      },

      bannerWidth: function () {
        return document.getElementById('advertisement-banner').offsetWidth
      }
    },

    created: async function () {
      // Load the background image to get its shape.
      function loadImage (context) {
        const img = new Image()
        img.onload = function () {
          context.image.size.width = this.width
          context.image.size.height = this.height
        }

        img.src = context.image.source
      }

      loadImage(this)
    }
  }
</script>


<style lang="scss" scoped>
  // Import 3rd party styles
  @import '../../node_modules/include-media/dist/include-media';
  @import '../../node_modules/font-awesome/css/font-awesome.css';

  // Import own styles
  @import '../style/3v-forhair';


  // Define some variables.
  $banner-height: 300px;


  #advertisement-banner {
    /* Shapes */
    left: calc(100% - #{$advertisement-width});
    right: 0;
    // Inherit the top and bottom properties from the upper component.


    /* Background */
    background-position: center center;
    background-repeat:  no-repeat;
    background-size: auto 100%;

    // Warning when try to shift image over the left or right border.
    .warn {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
      background-color: rgba(255, 0, 0, 0.3);
    }

    /* Cursor */
    cursor: grab;

    &.dragging {
      cursor: grabbing;
    }


    /* Mobile Properties */
    @include media('<desktop') {
      /* Shapes */
      left: 0;
      top: calc(100vh - #{$banner-height});
      right: 0;
      bottom: 0;

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

      * {
        margin: 0px;
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
        }
      }
    }
  }
</style>
