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
                  v-model="internalContent"/>
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

  const ArraySeparator = ','

  export default {
    props: {
      content: {
        default: 'haha'
      }
    },

    data: function () {
      return {
        internalContent: this.parseContent(this.content), // Internal state of the property.
        backup: '', // Will be set after creation.
        hints: [
          labels.EDIT_WINDOW_HINT_ABORT,
          labels.EDIT_WINDOW_HINT_MULTILINE
        ]
      }
    },

    methods: {
      parseContent (content) {
        // Convert the given content object to a string.
        if (Array.isArray(this.content)) {
          return content.reduce((a, b) => { return a + ArraySeparator + b })
        } else {
          return content
        }
      },

      finish () {
        // Simply close this component.
        this.$emit('destroy')
      },

      abort () {
        // Reset the content value to the backup.
        this.$emit('change', this.backup)
        this.$emit('destroy')
      }
    },

    computed: {
      // Convert the content as string back to the original content type.
      realContent () {
        if (Array.isArray(this.content)) {
          return this.internalContent.split(ArraySeparator)
        } else {
          return this.internalContent
        }
      }
    },

    watch: {
      realContent (value) {
        this.$emit('change', value)
      }
    },

    created () {
      // Do a backup of the current property value for a possible abort later on.
      this.backup = JSON.parse(JSON.stringify(this.content)) // Deep copy.
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
