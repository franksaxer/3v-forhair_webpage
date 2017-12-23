<template>
  <div  id="advertisement"
        :class="{'closed': closed}"
        :style="{'background-image': 'url(' + imageSource +')'}">

    <button class="close-button ghost-button"
            @click="closed = true">

      <i class="fa fa-times-circle"
         aria-hidden="true">
      </i>
    </button>

    <div class="upload-area">
      <label class="upload-button button">
        <div >
          <i class="fa fa-upload"
            aria-hidden="true">
          </i>
        </div>

        <input type="file" @change="fileChange"/>
      </label>


      <div class="file-view"
           v-if="mediaFile">
        <p>{{ fileName }}</p>
      </div>

      <div class="save-button button"
           v-if="mediaFile">
        <i class="fa fa-floppy-o"
           aria-hidden="true"
           @click="execute">
        </i>
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
        imageSource: loadDataObject(DataStoreEntries.generalConfig.key).advertisementImage,
        mediaFile: null
      }
    },

    methods: {
      fileChange: function (e) {
        this.mediaFile = e.target.files[0]
      },

      execute: async function () {
        await ApiConnector.upload('advertisement/aveda-example.png', this.mediaFile)
        await ApiConnector.save()
      }
    },

    computed: {
      fileName: function () {
        if (!this.mediaFile) return ''
        else return this.mediaFile.name
      }
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


  #advertisement {
    /* Shapes */
    left: calc(100% - #{$advertisement-width});
    right: 0;
    // Inherit the top and bottom properties from the upper component.


    /* Background */
    background-position: center center;
    background-repeat:  no-repeat;
    background-size: cover;


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

    .upload-area {
      display: flex;
      flex-flow: row;

      input[type='file'] {
        display: none;
      }


      $square: 30px;

      .button {
        width: $square;
        height: $square;
      }

      .file-view {
        $width: calc(100% - 2 * #{$square});
        min-width: $width;
        max-width: $width;
        overflow: hidden;
      }
    }
  }
</style>
