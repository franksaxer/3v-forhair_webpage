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
  export default {
    props: {
      content: {
        default: 'haha'
      }
    },

    data: function () {
      return {
        internalContent: this.content, // Internal state of the property.
        backup: '' // Will be set after creation.
      }
    },

    watch: {
      internalContent (value) {
        this.$emit('change', value)
      }
    },

    methods: {
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

    created () {
      // Do a backup of the current property value for a possible abort later on.
      this.backup = JSON.parse(JSON.stringify(this.content)) // Deep copy.
    }
  }
</script>

<style lang="scss" scoped>
  @import '../style/3v-forhair';

</style>
