<template>
  <div  id="edit-window"
        class="modal is-active">

    <div  class="modal-background"
          @click="abort"></div>

    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          {{ labels.EDIT_WINDOW_TITLE | translate }}
        </p>

        <button class="delete"
                aria-label="close"
                @click="abort"/>
      </header>

      <section class="modal-card-body">
        <ul>
          <li v-for="hint in hints">
            {{ hint | translate }}
          </li>
        </ul>

        <textarea class="textarea control"
                  v-model="internalContent"
                  v-if="contentType === contentTypes.TEXT ||
                        contentType === contentTypes.LIST" />

        <input  type="date"
                v-model="internalContent" 
                v-if="contentType === contentTypes.DATE" />
      </section>

      <footer class="modal-card-foot">
        <button class="button is-primary"
                @click="finish">

          {{ labels.EDIT_WINDOW_BTN_OK | translate }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import * as labels from '../enums/LabelKeys'
import * as types from '../enums/ContentTypes'
const ArraySeparator = ';'

export default {
  props: {
    content: {
      default: ''
    },

    type: {
      default: '',
      type: String,
      validator: value => {
        // If a type is given, it must be a defined one.
        if (value) {
          for (let i in types) {
            if (value === types[i]) {
              return true
            }
          }

          return false
        }

        return true
      }
    }
  },

  data: function() {
    return {
      internalContent: '', // Internal state of the property, set on created.
      backup: '', // Will be set after creation.
      hints: [
        labels.EDIT_WINDOW_HINT_ABORT,
        labels.EDIT_WINDOW_HINT_MULTILINE,
        labels.EDIT_WINDOW_HINT_LIST
      ],
      contentTypes: types // To validate during render.
    }
  },

  methods: {
    /**
     * Convert the given content (which is a pure String) to its real representation.
     * This real representation will be used by the input elements to adjust.
     * The content will be converted at the beginning once.
     *
     * @param content
     *        The String to convert.
     *
     * @return  represenation
     *          The converted internal representation.
     */
    parseContent(content) {
      switch (this.contentType) {
        case types.LIST:
          return content.reduce((a, b) => {
            return a + ArraySeparator + b
          })

        case types.DATE:
          return content

        case types.TEXT:
          return content
      }
    },

    /**
     * Emit the parent to destroy this element.
     * Used to remove this generic component from the DOM again.
     * Will be called when the user is finished with editing.
     */
    finish() {
      // Simply close this component.
      this.$emit('destroy')
    },

    /**
     * Eliminate any changes by emitting the origin value from the backup.
     * Afterwards call to be finished, to close the panel.
     * Will be called when the user cancel.
     */
    abort() {
      // Reset the content value to the backup.
      this.$emit('change', this.backup)
      this.finish()
    }
  },

  computed: {
    /**
     * Detect the abstract type of the content.
     * The type is based on the ContentType enumeration.
     * Per default the TEXT type is used if no other match.
     */
    contentType() {
      // Prefer given type over detection.
      if (this.type) {
        return this.type
      }

      // Detect the type.
      if (Array.isArray(this.content)) {
        return types.LIST
      } else {
        return types.TEXT
      }
    },

    /**
     * Conversion back to a pure string of the internal representation of the content.
     * Will be used to response to the parent component.
     */
    contentAsString() {
      switch (this.contentType) {
        case types.LIST:
          return this.internalContent.split(ArraySeparator)

        case types.DATE:
        case types.TEXT:
          return this.internalContent
      }
    }
  },

  watch: {
    /**
     * Emit the changes on the content of the user to the parent component.
     * Using the content that has been converted back to a pure String,
     * instead of the internal used representation.
     */
    contentAsString(value) {
      this.$emit('change', value)
    }
  },

  created() {
    // Do a backup of the current property value for a possible abort later on.
    this.backup = JSON.parse(JSON.stringify(this.content)) // Deep copy.
    this.internalContent = this.parseContent(this.content)
  }
}
</script>

<style lang="scss" scoped>
@import '../style/3v-forhair';

#edit-window {
  .modal-card {
    width: 70%;
  }

  ul {
    margin-bottom: 20px;
  }
}
</style>
